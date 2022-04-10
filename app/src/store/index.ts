import {
    CarStatus, CarTelemetry,
    DriveThroughServed,
    FastestLap, Weather,
    Lap, Session, SpeedTrap,
    MotionData, StopGoServed,
    Participant, Retirement,
    Penalty, TeammatePit,
    RaceWinner
} from '../models/telemetry.model';
import { defineStore } from 'pinia';
import axios from "axios"

export type GlobalState = {
    sessions: Session[];
    sessionData: Session[];

    // this data is queried every time the session changes
    participants: Participant[];
    weather: Weather[];
    fastestLap: FastestLap | null;
    retirements: Retirement[];
    teammatePits: TeammatePit[];
    raceWinner: RaceWinner | null;
    penalties: Penalty[];
    speedTraps: SpeedTrap[];
    stopGoServed: StopGoServed[];
    driveThroughServed: DriveThroughServed[];
    carTelemetries: CarTelemetry[];
    laps: Lap[];
    carStatuses: CarStatus[];
    motionsData: MotionData[];
};

export const useGlobalStore = defineStore({
    id: "globalStore",
    state: () => (
        {
            sessions: [],
            sessionData: [],
            participants: [],
            weather: [],
            fastestLap: null,
            retirements: [],
            teammatePits: [],
            raceWinner: null,
            penalties: [],
            speedTraps: [],
            stopGoServed: [],
            driveThroughServed: [],
            carTelemetries: [],
            laps: [],
            carStatuses: [],
            motionsData: [],
        } as GlobalState),
    getters: {
        getSessionData(): Session[] { return this.sessionData; },
        getParticipants(): Participant[] { return this.participants; },
        getWeather(): Weather[] { return this.weather; },
        getFastestLap(): FastestLap | null { return this.fastestLap; },
        getRetirements(): Retirement[] { return this.retirements; },
        getTeammatePits(): TeammatePit[] { return this.teammatePits; },
        getRaceWinner(): RaceWinner | null { return this.raceWinner; },
        getPenalties(): Penalty[] { return this.penalties; },
        getSpeedTraps(): SpeedTrap[] { return this.speedTraps; },
        getStopGoServed(): StopGoServed[] { return this.stopGoServed; },
        getDriveThroughServed(): DriveThroughServed[] { return this.driveThroughServed; },
        getCarStatuses(): CarStatus[] { return this.carStatuses; },
        getLaps(): Lap[] { return this.laps; },
        getCarTelemetries(): CarTelemetry[] { return this.carTelemetries; },
        getMotionData(): MotionData[] { return this.motionsData; }
    },
    actions: {
        allSessionsByUserID(userID: string): any {
            return this.sessions.filter(session => session.userID == userID);
        },
        async fetchSessions(userID: string) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions`);
                this.sessions = result.data.data.map((row: any) => {
                    return {
                        userID: userID,
                        sessionID: row.session_id,
                        time: row.time,
                        sessionType: row.session_type,
                        trackName: row.track_name,
                    }
                });
            }
            catch (error) {
                alert(error)
                console.error(error)
            }
        },
        async fetchSessionData(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}`);
                this.sessionData = result.data.data.map((row: any) => {
                    return {
                        userID: userID,
                        sessionID: row.session_id,
                        time: row.time,
                        airTemperature: row.air_temperature,
                        sessionType: row.session_type,
                        trackName: row.track_name,
                        trackTemperature: row.track_temperature,
                        weather: row.weather,
                    }
                });
            }
            catch (error) {
                alert(error)
                console.error(error)
            }
        },
        async fetchLaps(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/laps`);
                this.laps = result.data.data.map((row: any) => {
                    return {
                        userID: userID,
                        sessionID: sessionID,
                        time: row.time,
                        resultStatus: row.result_status,
                        gridStartPosition: row.grid_start_position,
                        currentPosition: row.current_position,
                        currentLap: row.current_lap
                    }
                });
            }
            catch (error) {
                alert(error)
                console.error(error)
            }
        },
        async fetchCarTelemetries(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/telemetries`);
                this.carTelemetries = result.data.data.map((row: any) => {
                    return {
                        userID: userID,
                        sessionID: sessionID,
                        time: row.time,
                        speed: row.speed,
                        engineRPM: row.engine_rpm,
                        engineTemperature: row.engine_temperature,
                        brakeApplied: row.brake_applied,
                        throttleApplied: row.throttle_applied,
                        brakeRL: row.brake_rl,
                        brakeRR: row.brake_rr,
                        brakeFL: row.brake_fl,
                        brakeFR: row.brake_fr,
                        tyrePressureRL: row.tyre_pressure_rl,
                        tyrePressureRR: row.tyre_pressure_rr,
                        tyrePressureFL: row.tyre_pressure_fl,
                        tyrePressureFR: row.tyre_pressure_fr,
                        tyreInnerTemperatureRL: row.tyre_inner_temperature_rl,
                        tyreInnerTemperatureRR: row.tyre_inner_temperature_rr,
                        tyreInnerTemperatureFL: row.tyre_inner_temperature_fl,
                        tyreInnerTemperatureFR: row.tyre_inner_temperature_fr,
                        tyreSurfaceTemperatureRL: row.tyre_surface_temperature_rl,
                        tyreSurfaceTemperatureRR: row.tyre_surface_temperature_rr,
                        tyreSurfaceTemperatureFL: row.tyre_surface_temperature_fl,
                        tyreSurfaceTemperatureFR: row.tyre_surface_temperature_rf,
                    }
                });
            }
            catch (error) {
                alert(error)
                console.error(error)
            }
        },
        async fetchCarStatuses(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/statuses`);
                this.carStatuses = result.data.data.map((row: any) => {
                    return {
                        userID: userID,
                        sessionID: sessionID,
                        time: row.time,
                        tyresAge: row.tyres_age,
                        fuelMix: row.fuel_mix,
                        fuelCapacity: row.fuel_capacity,
                        fuelCurrent: row.fuel_current,
                        fuelRemainingInLaps: row.fuel_remanining_in_laps,
                    }
                });
            }
            catch (error) {
                alert(error)
                console.error(error)
            }
        },
        async fetchMotionsData(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/motions-data`);
                this.motionsData = result.data.data.map((row: any) => {
                    return {
                        userID: userID,
                        sessionID: sessionID,
                        time: row.time,
                    }
                });
            }
            catch (error) {
                alert(error)
                console.error(error)
            }
        }
    },
});