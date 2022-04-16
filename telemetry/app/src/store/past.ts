import {
    CarStatus, CarTelemetry,
    DriveThroughServed,
    FastestLap, Weather,
    Lap, Session, SpeedTrap,
    MotionData, StopGoServed,
    Participant, Retirement,
    Penalty, TeammatePit,
    RaceWinner
} from '../../../models/telemetry.model';
import { defineStore } from 'pinia';
import axios from "axios"

const baseApiURL = "http://localhost:8082";

export type PastState = {
    sessions: Session[];
    sessionData: Session | null;

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
            sessionData: null,
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
        getSessionData(): Session | null { return this.sessionData; },
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
        async fetchSessions(userID: string) {
            try {
                await axios.get<Session[]>(`${baseApiURL}/users/${userID}/sessions`)
                    .then(response => {
                        this.sessions = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchSessionData(userID: string, sessionID: string) {
            try {
                await axios.get<Session>(`${baseApiURL}/users/${userID}/sessions/${sessionID}`)
                    .then(response => {
                        this.sessionData = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchParticipants(userID: string, sessionID: string) {
            try {
                await axios.get<Participant[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/participants`)
                    .then(response => {
                        this.participants = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchWeather(userID: string, sessionID: string) {
            try {
                await axios.get<Weather[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/weather`)
                    .then(response => {
                        this.weather = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchFastestLap(userID: string, sessionID: string) {
            try {
                await axios.get<FastestLap>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/fastest-lap`)
                    .then(response => {
                        this.fastestLap = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchRetirements(userID: string, sessionID: string) {
            try {
                await axios.get<Retirement[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/retirements`)
                    .then(response => {
                        this.retirements = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchTeammatePits(userID: string, sessionID: string) {
            try {
                await axios.get<TeammatePit[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/teammate-pits`)
                    .then(response => {
                        this.teammatePits = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchRaceWinner(userID: string, sessionID: string) {
            try {
                await axios.get<RaceWinner>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/race-winner`)
                    .then(response => {
                        this.raceWinner = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchPenalties(userID: string, sessionID: string) {
            try {
                await axios.get<Penalty[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/penalties`)
                    .then(response => {
                        this.penalties = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchSpeedTraps(userID: string, sessionID: string) {
            try {
                await axios.get<SpeedTrap[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/speed-traps`)
                    .then(response => {
                        this.speedTraps = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchStopGoServed(userID: string, sessionID: string) {
            try {
                await axios.get<StopGoServed[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/stop-go-served`)
                    .then(response => {
                        this.stopGoServed = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchDriveThroughServed(userID: string, sessionID: string) {
            try {
                await axios.get<DriveThroughServed[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/drive-through-served`)
                    .then(response => {
                        this.driveThroughServed = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchLaps(userID: string, sessionID: string) {
            try {
                await axios.get<Lap[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/laps`)
                    .then(response => {
                        this.laps = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchCarTelemetries(userID: string, sessionID: string) {
            try {
                await axios.get<CarTelemetry[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/car-telemetry`)
                    .then(response => {
                        this.carTelemetries = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchCarStatuses(userID: string, sessionID: string) {
            try {
                await axios.get<CarStatus[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/car-status`)
                    .then(response => {
                        this.carStatuses = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        },
        async fetchMotionsData(userID: string, sessionID: string) {
            try {
                await axios.get<MotionData[]>(`${baseApiURL}/users/${userID}/sessions/${sessionID}/motions-data`)
                    .then(response => {
                        this.motionsData = response.data;
                    });
            }
            catch (error) {
                console.error(error)
            }
        }
    },
});