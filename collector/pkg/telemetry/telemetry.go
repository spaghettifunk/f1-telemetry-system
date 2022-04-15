package telemetry

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/env/event"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/env/session"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/env/team"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/env/track"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/packets"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/telemetry"

	"github.com/spaghettifunk/f1-telemetry-system/collector/pkg/logger"
	"github.com/spaghettifunk/f1-telemetry-system/collector/pkg/producers"
)

var wheelOrderArr = []string{"rl", "rr", "fl", "fr"}

type Client struct {
	*telemetry.Client

	ProducerLog producers.ProducerLog
	UserID      string

	logger *logger.TelemetryLogger
}

// WithKafka sets the producer to Kafka
func WithKafka(brokers string) producers.ProducerLog {
	kp, err := producers.NewKafka(brokers)
	if err != nil {
		log.Fatalf("cannot create Kafka producer: %s", err.Error())
		os.Exit(1)
	}
	return kp
}

func New(address string, port int, producer producers.ProducerLog, tl *logger.TelemetryLogger) (*Client, error) {
	client, err := telemetry.NewClientByCustomIpAddressAndPort(address, port)
	if err != nil {
		return nil, err
	}

	// userID := uuid.New().String()
	userID := "7f443b8f-1cad-4d00-ac25-2f1fe444d600"

	c := &Client{
		client,
		producer,
		userID,
		tl,
	}
	return c, nil
}

type Timespan time.Duration

func (t Timespan) Format(format string) string {
	z := time.Unix(0, 0).UTC()
	return z.Add(time.Duration(t)).Format(format)
}

func (c *Client) Collect() {
	c.logger.WriteInfo("Collecting events...")

	c.OnParticipantsPacket(func(packet *packets.PacketParticipantsData) {
		msg := map[string]interface{}{}

		for i, participant := range packet.Participants {
			msg["ai_controlled"] = participant.AIControlled
			msg["driver_id"] = participant.DriverID
			msg["driver_name"] = participant.NameToString()
			msg["driver_nationality"] = Nationality(participant.Nationality).String()
			msg["driver_race_number"] = participant.RaceNumber
			msg["driver_vehicle_id"] = i
			msg["is_teammate"] = participant.MyTeam
			msg["team_id"] = participant.TeamID
			msg["team_name"] = team.Team(participant.TeamID).String()

			c.WriteToProducer(msg, "participants", packet.Header.SessionUID)
		}
	})

	c.OnSessionPacket(func(packet *packets.PacketSessionData) {
		// session data
		{
			msg := map[string]interface{}{}
			msg["session_type"] = session.Session(packet.SessionType).String()
			msg["track_name"] = track.Track(packet.TrackID).String()
			msg["track_id"] = packet.TrackID
			msg["track_total_laps"] = packet.TotalLaps
			msg["track_length"] = packet.TrackLength

			c.WriteToProducer(msg, "session", packet.Header.SessionUID)
		}

		// weather data
		{
			msg := map[string]interface{}{}
			for _, forecast := range packet.WeatherForecastSamples {
				msg["weather_type"] = Weather(packet.Weather).String()
				msg["track_temperature"] = packet.TrackTemperature
				msg["air_temperature"] = packet.AirTemperature

				msg["forecast_weather_type"] = Weather(forecast.Weather).String()
				msg["forecast_air_temperature"] = forecast.AirTemperature
				msg["forecast_air_temperature_change"] = forecast.AirTemperatureChange
				msg["forecast_rain_percentage"] = forecast.RainPercentage
				msg["forecast_time_offset"] = getTimeInMS(forecast.TimeOffset)
				msg["forecast_track_temperature"] = forecast.TrackTemperature
				msg["forecast_track_temperature_change"] = forecast.TrackTemperatureChange

				c.WriteToProducer(msg, "weather", packet.Header.SessionUID)
			}
		}
	})

	c.OnEventPacket(func(packet *packets.PacketEventData) {
		msg := map[string]interface{}{}

		switch packet.EventCodeString() {
		case event.FastestLap:
			fp := packet.EventDetails.(*packets.FastestLap)
			msg["fastest_lap_ms"] = getTimeInMS(fp.LapTime)
			msg["driver_vehicle_id"] = fp.VehicleIdx
			c.WriteToProducer(msg, "fastest_lap", packet.Header.SessionUID)
			break
		case event.Retirement:
			rp := packet.EventDetails.(*packets.Retirement)
			msg["driver_vehicle_id"] = rp.VehicleIdx
			c.WriteToProducer(msg, "retirement", packet.Header.SessionUID)
			break
		case event.TeamMateInPit:
			tmmp := packet.EventDetails.(*packets.TeamMateInPits)
			msg["driver_vehicle_id"] = tmmp.VehicleIdx
			c.WriteToProducer(msg, "teammate_pit", packet.Header.SessionUID)
			break
		case event.RaceWinner:
			rwp := packet.EventDetails.(*packets.RaceWinner)
			msg["driver_vehicle_id"] = rwp.VehicleIdx
			c.WriteToProducer(msg, "race_winner", packet.Header.SessionUID)
			break
		case event.PenaltyIssued:
			pp := packet.EventDetails.(*packets.Penalty)
			msg["penalty_type"] = Penalty(pp.PenaltyType).String()
			msg["infrangement_type"] = Infrangement(pp.InfringementType).String()
			msg["lap_number"] = pp.LapNum
			msg["places_gained"] = pp.PlacesGained
			msg["penalty_time"] = getTimeInMS(pp.Time)
			msg["driver_vehicle_id"] = pp.VehicleIdx
			msg["other_driver_vehicle_id"] = pp.OtherVehicleIdx
			c.WriteToProducer(msg, "penalty", packet.Header.SessionUID)
			break
		case event.SpeedTrapTriggered:
			stp := packet.EventDetails.(*packets.SpeedTrap)
			msg["driver_fastest_in_session"] = stp.DriverFastestInSession
			msg["overall_fastest_in_session"] = stp.OverallFastestInSession
			msg["speed"] = stp.Speed
			msg["driver_vehicle_id"] = stp.VehicleIdx
			c.WriteToProducer(msg, "speed_trap", packet.Header.SessionUID)
			break
		case event.StopGoServed:
			stp := packet.EventDetails.(*packets.StopGoPenaltyServed)
			msg["driver_vehicle_id"] = stp.VehicleIdx
			c.WriteToProducer(msg, "stop_go_served", packet.Header.SessionUID)
			break
		case event.DriveThroughServed:
			dtp := packet.EventDetails.(*packets.DriveThroughPenaltyServed)
			msg["driver_vehicle_id"] = dtp.VehicleIdx
			c.WriteToProducer(msg, "drive_through_served", packet.Header.SessionUID)
			break
		}
	})

	c.OnCarTelemetryPacket(func(packet *packets.PacketCarTelemetryData) {
		msg := map[string]interface{}{}

		for i, car := range packet.CarTelemetryData {
			if i == int(packet.Header.PlayerCarIndex) {
				// only for the player it makes sense
				msg["suggested_gear"] = packet.SuggestedGear
			} else {
				msg["suggested_gear"] = car.Gear
			}

			msg["driver_vehicle_id"] = i
			msg["speed"] = car.Speed
			msg["throttle_applied"] = car.Throttle
			msg["steer_applied"] = car.Steer
			msg["brake_applied"] = car.Brake
			msg["clutch_applied"] = car.Clutch
			msg["gear"] = car.Gear
			msg["engine_rpm"] = car.EngineRPM
			msg["drs"] = car.DRS
			msg["engine_temperature"] = car.EngineTemperature

			for i, wheel := range wheelOrderArr {
				brakeID := fmt.Sprintf("brake_%s", wheel)
				tyrePressureID := fmt.Sprintf("tyre_pressure_%s", wheel)
				tyreInnerTemperatureID := fmt.Sprintf("tyre_inner_temperature_%s", wheel)
				tyreSurfaceTemperatureID := fmt.Sprintf("tyre_surface_temperature_%s", wheel)

				msg[brakeID] = car.BrakesTemperature[i]
				msg[tyrePressureID] = car.TyresPressure[i]
				msg[tyreInnerTemperatureID] = car.TyresInnerTemperature[i]
				msg[tyreSurfaceTemperatureID] = car.TyresSurfaceTemperature[i]
			}
			c.WriteToProducer(msg, "car_telemetry", packet.Header.SessionUID)
		}
	})

	c.OnLapPacket(func(packet *packets.PacketLapData) {
		msg := map[string]interface{}{}

		for i, lap := range packet.LapData {
			msg["driver_vehicle_id"] = i
			msg["last_lap_time_ms"] = getTimeInMS(lap.LastLapTimeInMS)
			msg["current_lap_time_ms"] = getTimeInMS(lap.CurrentLapTimeInMS)
			msg["sector_one_time_ms"] = getTimeInMS(lap.Sector1TimeInMS)
			msg["sector_two_time_ms"] = getTimeInMS(lap.Sector2TimeInMS)
			msg["lap_distance"] = lap.LapDistance
			msg["total_distance"] = lap.TotalDistance
			msg["safety_car_delta"] = getTimeInMS(lap.SafetyCarDelta)
			msg["current_position"] = lap.CarPosition
			msg["current_lap"] = lap.CurrentLapNum
			msg["pit_status"] = PitStatus(lap.PitStatus).String()
			msg["num_pit_stops"] = lap.NumPitStops
			msg["sector"] = lap.Sector
			msg["current_lap_invalid"] = lap.CurrentLapInvalid
			msg["penalties_sec"] = getTimeInMS(lap.Penalties)
			msg["num_warnings"] = lap.Warnings
			msg["num_unserved_drive_through_penalties"] = lap.NumUnservedDriveThroughPens
			msg["num_unserved_stop_go_penalties"] = lap.NumUnservedStopGoPens
			msg["grid_start_position"] = lap.GridPosition
			msg["driver_status"] = DriverStatus(lap.DriverStatus).String()
			msg["result_status"] = ResultStatus(lap.ResultStatus).String()
			msg["pit_lane_timer_active"] = lap.PitLaneTimerActive
			msg["pit_lane_time_in_lane_ms"] = getTimeInMS(lap.PitLaneTimeInLaneInMS)
			msg["pit_stop_timer_in_ms"] = getTimeInMS(lap.PitStopTimerInMS)
			msg["pit_stop_should_serve_penalty"] = lap.PitStopShouldServePen

			c.WriteToProducer(msg, "lap", packet.Header.SessionUID)
		}
	})

	c.OnCarStatusPacket(func(packet *packets.PacketCarStatusData) {
		msg := map[string]interface{}{}

		for i, status := range packet.CarStatusData {
			msg["driver_vehicle_id"] = i
			msg["fuel_mix"] = FuelMix(status.FuelMix).String()
			msg["fuel_capacity"] = status.FuelCapacity
			msg["fuel_current"] = status.FuelInTank
			msg["fuel_remaining_in_laps"] = status.FuelRemainingLaps
			msg["max_rpm"] = status.MaxRPM
			msg["idle_rpm"] = status.IdleRPM
			msg["max_gears"] = status.MaxGears
			msg["drs_allowed"] = status.DRSAllowed
			msg["actual_tyre_compound"] = ActualTyreCompound(status.ActualTyreCompound).String()
			msg["visual_tyre_compound"] = VisualTyreCompound(status.VisualTyreCompound).String()
			msg["tyres_age"] = status.TyresAgeLaps
			msg["fia_flag"] = FIAFlags(status.VehicleFIAFlags).String()
			msg["ers_store_energy"] = status.ERSStoreEnergy
			msg["ers_mode"] = ERSMode(status.ERSDeployMode).String()
			msg["ers_harvested_lap_mguk"] = status.ERSHarvestedThisLapMGUK
			msg["ers_harvested_lap_mguh"] = status.ERSHarvestedThisLapMGUH
			msg["ers_deployed_lap"] = status.ERSDeployedThisLap

			c.WriteToProducer(msg, "car_status", packet.Header.SessionUID)
		}
	})

	c.OnMotionPacket(func(packet *packets.PacketMotionData) {
		msg := map[string]interface{}{}

		for i, motion := range packet.CarMotionData {
			msg["driver_vehicle_id"] = i

			// positions
			msg["world_position_x"] = motion.WorldPositionX
			msg["world_position_y"] = motion.WorldPositionY
			msg["world_position_z"] = motion.WorldPositionZ
			msg["world_velocity_x"] = motion.WorldVelocityX
			msg["world_velocity_y"] = motion.WorldVelocityY
			msg["world_velocity_z"] = motion.WorldVelocityZ
			msg["world_forward_x"] = motion.WorldForwardDirX
			msg["world_forward_y"] = motion.WorldForwardDirY
			msg["world_forward_z"] = motion.WorldForwardDirZ
			msg["world_right_x"] = motion.WorldRightDirX
			msg["world_right_y"] = motion.WorldRightDirY
			msg["world_right_z"] = motion.WorldRightDirZ

			msg["gforce_lateral"] = motion.GForceLateral
			msg["gforce_longitudinal"] = motion.GForceLongitudinal
			msg["gforce_vertical"] = motion.GForceVertical

			msg["yaw"] = motion.Yaw
			msg["pitch"] = motion.Pitch
			msg["roll"] = motion.Roll

			c.WriteToProducer(msg, "motion_data", packet.Header.SessionUID)
		}
	})

	c.Run() // run F1 Telemetry Client
}

func (c *Client) WriteToProducer(msg map[string]interface{}, name string, sessionID uint64) {
	// enrich with default metadata
	msg["user_id"] = c.UserID
	msg["session_id"] = sessionID
	msg["time"] = time.Now().Format("2006-01-02 15:04:05")

	// write to producer
	b, err := json.Marshal(msg)
	if err != nil {
		// log the error and discard the event
		c.logger.WriteError(err.Error())
		return
	}

	c.logger.WriteDebug(b)

	c.ProducerLog.Write(producers.PacketLog{
		Name:    name,
		Message: b,
	})
}

type Number interface {
	uint8 | uint16 | uint32 | float32
}

func getTimeInMS[V Number](val V) int64 {
	return time.Duration(float64(val) * float64(time.Millisecond)).Milliseconds()
}
