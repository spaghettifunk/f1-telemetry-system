package telemetry

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"os"
	"time"

	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/env/event"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/env/session"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/env/track"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/packets"
	"github.com/anilmisirlioglu/f1-telemetry-go/pkg/telemetry"

	"github.com/spaghettifunk/f1-telemetry-system/collector/pkg/producers"
)

var wheelOrderArr = []string{"rl", "rr", "fl", "fr"}

type Client struct {
	*telemetry.Client

	ProducerLog producers.ProducerLog

	UserID string
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

// WithClickhouse sets the producer to the Clickhouse database
func WithClickhouse(address, port string) producers.ProducerLog {
	cp, err := producers.NewClickHouse(address, port)
	if err != nil {
		log.Fatalf("cannot create Clickhouse producer: %s", err.Error())
		os.Exit(1)
	}
	return cp
}

func New(address string, port int, producer producers.ProducerLog) (*Client, error) {
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
	}
	return c, nil
}

func (c *Client) Collect() {
	log.Println("Collecting events...")

	// events
	c.OnSessionPacket(func(packet *packets.PacketSessionData) {
		msg := map[string]interface{}{}

		msg["weather"] = Weather(packet.Weather)
		msg["session_type"] = session.Session(packet.SessionType)
		msg["track_temperature"] = packet.TrackTemperature
		msg["air_temperature"] = packet.AirTemperature
		msg["track_name"] = track.Track(packet.TrackID)

		// enrich with default metadata
		msg["session_id"] = packet.Header.SessionUID
		msg["datetime"] = time.Now().UTC().String()

		// write to producer
		b, err := json.Marshal(msg)
		if err != nil {
			panic(err)
		}

		c.ProducerLog.Write(producers.PacketLog{
			Name:    "session",
			Message: b,
		})
	})

	c.OnEventPacket(func(packet *packets.PacketEventData) {
		msg := map[string]interface{}{}

		switch packet.EventCodeString() {
		case event.FastestLap:
			fp := packet.EventDetails.(*packets.FastestLap)
			if fp.VehicleIdx == packet.Header.PlayerCarIndex {
				integ, decim := math.Modf(float64(fp.LapTime))
				msg["fastest_lap"] = time.Unix(int64(integ), int64(decim*(1e9))).String()
			}
			break
		}

		// enrich with default metadata
		msg["session_id"] = packet.Header.SessionUID
		msg["datetime"] = time.Now().UTC().String()

		// write to producer
		b, err := json.Marshal(msg)
		if err != nil {
			panic(err)
		}

		c.ProducerLog.Write(producers.PacketLog{
			Name:    "event",
			Message: b,
		})
	})

	c.OnCarTelemetryPacket(func(packet *packets.PacketCarTelemetryData) {
		msg := map[string]interface{}{}

		car := packet.Self()

		msg["speed"] = float64(car.Speed)
		msg["engine_rpm"] = float64(car.EngineRPM)
		msg["engine_temperature"] = float64(car.EngineTemperature)
		msg["brake_applied"] = float64(car.Brake)

		for i, wheel := range wheelOrderArr {
			breakID := fmt.Sprintf("break_%s", wheel)
			tyrePressureID := fmt.Sprintf("tyre_pressure_%s", wheel)
			tyreInnerTemperatureID := fmt.Sprintf("tyre_inner_temperature_%s", wheel)
			tyreSurfaceTemperatureID := fmt.Sprintf("tyre_surface_temperature_%s", wheel)

			msg[breakID] = float64(car.BrakesTemperature[i])
			msg[tyrePressureID] = float64(car.TyresPressure[i])
			msg[tyreInnerTemperatureID] = float64(car.TyresInnerTemperature[i])
			msg[tyreSurfaceTemperatureID] = float64(car.TyresSurfaceTemperature[i])
		}

		// enrich with default metadata
		msg["session_id"] = packet.Header.SessionUID
		msg["datetime"] = time.Now().UTC().String()

		// write to producer
		b, err := json.Marshal(msg)
		if err != nil {
			panic(err)
		}

		c.ProducerLog.Write(producers.PacketLog{
			Name:    "car_telemetry",
			Message: b,
		})
	})

	c.OnLapPacket(func(packet *packets.PacketLapData) {
		msg := map[string]interface{}{}

		lap := packet.Self()

		msg["result_status"] = ResultStatus(lap.ResultStatus)
		msg["grid_start_position"] = lap.GridPosition
		msg["current_position"] = lap.CarPosition
		msg["current_lap"] = lap.CurrentLapNum

		// enrich with default metadata
		msg["session_id"] = packet.Header.SessionUID
		msg["datetime"] = time.Now().UTC().String()

		// write to producer
		b, err := json.Marshal(msg)
		if err != nil {
			panic(err)
		}

		c.ProducerLog.Write(producers.PacketLog{
			Name:    "lap",
			Message: b,
		})
	})

	c.OnCarStatusPacket(func(packet *packets.PacketCarStatusData) {
		msg := map[string]interface{}{}

		status := packet.Self()

		msg["tyres_age"] = status.TyresAgeLaps
		msg["fuel_mix"] = FuelMix(status.FuelMix)
		msg["fuel_capacity"] = float64(status.FuelCapacity)
		msg["fuel_current"] = float64(status.FuelInTank)
		msg["fuel_remaining_in_laps"] = float64(status.FuelRemainingLaps)

		// enrich with default metadata
		msg["session_id"] = packet.Header.SessionUID
		msg["datetime"] = time.Now().UTC().String()

		// write to producer
		b, err := json.Marshal(msg)
		if err != nil {
			panic(err)
		}

		c.ProducerLog.Write(producers.PacketLog{
			Name:    "car_status",
			Message: b,
		})

	})

	// TODO: interesting graphs can come out from this data...
	c.OnMotionPacket(func(packet *packets.PacketMotionData) {
		msg := map[string]interface{}{}

		// enrich with default metadata
		msg["session_id"] = packet.Header.SessionUID
		msg["datetime"] = time.Now().UTC().String()

		// write to producer
		b, err := json.Marshal(msg)
		if err != nil {
			panic(err)
		}

		c.ProducerLog.Write(producers.PacketLog{
			Name:    "motion_data",
			Message: b,
		})
	})

	c.Run() // run F1 Telemetry Client
}
