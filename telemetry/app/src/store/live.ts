import {
    CarStatus, CarTelemetry,
    DriveThroughServed,
    FastestLap, Weather,
    Lap, SpeedTrap, Session,
    MotionData, StopGoServed,
    Participant, Retirement,
    Penalty, TeammatePit,
    RaceWinner
} from "@backend/telemetry.model";
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';

const socket = io("ws://localhost:8082");

export type LiveState = {
    session: Session[];
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

var liveState: LiveState = {
    session: [],
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
}

export const useLiveStore = defineStore({
    id: "liveStore",
    state: () => liveState,
    getters: {
        getSession(): Session[] { return liveState.session; },
        getParticipants(): Participant[] { return liveState.participants; },
        getWeather(): Weather[] { return liveState.weather; },
        getFastestLap(): FastestLap | null { return liveState.fastestLap; },
        getRetirements(): Retirement[] { return liveState.retirements; },
        getTeammatePits(): TeammatePit[] { return liveState.teammatePits; },
        getRaceWinner(): RaceWinner | null { return liveState.raceWinner; },
        getPenalties(): Penalty[] { return liveState.penalties; },
        getSpeedTraps(): SpeedTrap[] { return liveState.speedTraps; },
        getStopGoServed(): StopGoServed[] { return liveState.stopGoServed; },
        getDriveThroughServed(): DriveThroughServed[] { return liveState.driveThroughServed; },
        getCarStatuses(): CarStatus[] { return liveState.carStatuses; },
        getLaps(): Lap[] { return liveState.laps; },
        getCarTelemetries(): CarTelemetry[] { return liveState.carTelemetries; },
        getMotionData(): MotionData[] { return liveState.motionsData; }
    }
});

// All the events for getting data from Kafka
socket.on("participants", (...args: Participant[]) => {
    liveState.participants.push(...args);
});

socket.on("session", (...args: Session[]) => {
    console.log(...args);
    liveState.session.push(...args);
});

socket.on("weather", (...args: Weather[]) => {
    liveState.weather.push(...args);
});

socket.on("fastest_lap", (args: FastestLap) => {
    liveState.fastestLap = args;
});

socket.on("teammate_pit", (...args: TeammatePit[]) => {
    liveState.teammatePits.push(...args);
});

socket.on("race_winner", (args: RaceWinner) => {
    liveState.raceWinner = args;
});

socket.on("penalty", (...args: Penalty[]) => {
    liveState.penalties.push(...args);
});

socket.on("speed_trap", (...args: SpeedTrap[]) => {
    liveState.speedTraps.push(...args);
});

socket.on("stop_go_served", (...args: StopGoServed[]) => {
    liveState.stopGoServed.push(...args);
});

socket.on("drive_through_served", (...args: DriveThroughServed[]) => {
    liveState.driveThroughServed.push(...args);
});

socket.on("retirement", (...args: Retirement[]) => {
    liveState.retirements.push(...args);
});

socket.on("car_telemetry", (...args: CarTelemetry[]) => {
    liveState.carTelemetries.push(...args);
});

socket.on("lap", (...args: Lap[]) => {
    liveState.laps.push(...args);
});

socket.on("car_status", (...args: CarStatus[]) => {
    liveState.carStatuses.push(...args);
});

socket.on("motion_data", (...args: MotionData[]) => {
    liveState.motionsData.push(...args);
});