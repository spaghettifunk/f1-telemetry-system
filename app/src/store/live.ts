import {
    CarStatus, CarTelemetry,
    DriveThroughServed,
    FastestLap, Weather,
    Lap, SpeedTrap,
    MotionData, StopGoServed,
    Participant, Retirement,
    Penalty, TeammatePit,
    RaceWinner
} from '../models/telemetry.model';
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';

const socket = io("ws://localhost:8082");

export type LiveState = {
    participants: Participant[];
    weather: Weather[];
    fastestLap: FastestLap | null;
    Retirements: Retirement[];
    TeammatePits: TeammatePit[];
    raceWinner: RaceWinner | null;
    penalties: Penalty[];
    speedTraps: SpeedTrap[];
    StopGoServed: StopGoServed[];
    driveThroughServed: DriveThroughServed[];
    carTelemetries: CarTelemetry[];
    laps: Lap[];
    carStatuses: CarStatus[];
    motionsData: MotionData[];
};

export const useLiveStore = defineStore({
    id: "liveStore",
    state: () => (
        {
            participants: [],
            weather: [],
            fastestLap: null,
            Retirements: [],
            TeammatePits: [],
            raceWinner: null,
            penalties: [],
            speedTraps: [],
            StopGoServed: [],
            driveThroughServed: [],
            carTelemetries: [],
            laps: [],
            carStatuses: [],
            motionsData: [],
        } as LiveState),
    getters: {
        getCarTelemetries(): CarTelemetry[] {
            return this.carTelemetries;
        },
    },
    actions: {
        fetchCarTelemetries() {
            socket.on("car_telemetry", (...args: CarTelemetry[]) => {
                this.carTelemetries.push(...args);
            });
        },

    }
});