import { Session, Event, Lap, CarTelemetry, CarStatus, MotionData } from '../models/telemetry.model';
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import axios from "axios"

const socket = io("ws://localhost:8082");

// receive message from backend
socket.on("hello", (arg: any) => {
    console.log(arg);
});

// send message to backend
socket.emit("howdy", "stranger");

export type GlobalState = {
    sessions: Session[] | [];
    sessionData: Session[] | [];

    // this data is queried every time the session changes
    event: Event | null;
    laps: Lap[] | [];
    carTelemetries: CarTelemetry[] | [];
    carStatuses: CarStatus[] | [];
    motionsData: MotionData[] | [];
};

export const useGlobalStore = defineStore({
    id: "globalStore",
    state: () => (
        {
            sessions: [],
            sessionData: [],
            event: null,
            laps: [],
            carTelemetries: [],
            carStatuses: [],
            motionsData: [],
        } as GlobalState),
    getters: {
        getSessionData(): Session[] | [] {
            return this.sessionData;
        },
        getEvents(): Event | null {
            return this.event;
        },
        getLaps(): Lap[] | [] {
            return this.laps;
        },
        getCarTelemetries(): CarTelemetry[] | [] {
            return this.carTelemetries;
        },
        getCarStatuses(): CarStatus[] | [] {
            return this.carStatuses;
        },
        getMotionsData(): MotionData[] | [] {
            return this.motionsData;
        }
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
        async fetchEvents(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/events`);
                this.event = result.data.data.map((row: any) => {
                    return {
                        userID: userID,
                        sessionID: sessionID,
                        time: row.time,
                        fastestLapMs: row.fastest_lap_ms,
                        fastestLapStr: row.fastest_lap_str
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