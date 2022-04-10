import {
    CarStatus, CarTelemetry,
    DriveThroughServed,
    FastestLap, Weather,
    Lap, Session, SpeedTrap,
    MotionData, StopGoServed,
    Participant, Retirement,
    Penalty, TeammatePit,
    RaceWinner
} from '@backend/telemetry.model';
import { defineStore } from 'pinia';
import axios from "axios"

export type PastState = {
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

export const usePastStore = defineStore({
    id: "pastStore",
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
        } as PastState),
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
            return this.sessions.filter(session => session.user_id == userID);
        },
        async fetchSessions(userID: string) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions`);
                this.sessions = result.data.data.map((row: Session) => {
                    return row;
                });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchSessionData(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}`);
                this.sessionData = result.data.data.map((row: Session) => {
                    return row;
                });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchLaps(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/laps`);
                this.laps = result.data.data.map((row: Lap) => {
                    return row;
                });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchCarTelemetries(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/telemetries`);
                this.carTelemetries = result.data.data.map((row: CarTelemetry) => {
                    return row;
                });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchCarStatuses(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/statuses`);
                this.carStatuses = result.data.data.map((row: CarStatus) => {
                    return row;
                });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchMotionsData(userID: string, sessionID: number) {
            try {
                const result = await axios.get(`http://localhost:8081/users/${userID}/sessions/${sessionID}/motions-data`);
                this.motionsData = result.data.data.map((row: MotionData) => {
                    return row;
                });
            }
            catch (error) {
                console.error(error)
            }
        }
    },
});