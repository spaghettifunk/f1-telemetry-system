import { Session, Event, Lap, CarTelemetry, CarStatus, MotionData } from '../models/telemetry.model';
import { defineStore } from 'pinia';

export type GlobalState = {
    sessions: Session[] | [];
    selectedSession: Session | null;

    // this data is queried every time the session changes
    events: Event[] | [];
    laps: Lap[] | [];
    carTelemetries: CarTelemetry[] | [];
    carStatuses: CarStatus[] | [];
    motionsData: MotionData[] | [];
};

export const useGlobalStore = defineStore({
    id: "globalStore",
    state: () => (
        {
            // all data
            sessions: [{
                sessionID: 920593753,
                userID: "7f443b8f-1cad-4d00-ac25-2f1fe444d600",
                time: "2022-03-28 21:38:03.000",
                airTemperature: 24,
                sessionType: "P1",
                trackName: "Melbourne",
                trackTemperature: 32.00,
                weather: "Clean"
            },
            {
                sessionID: 842310851,
                userID: "7f443b8f-1cad-4d00-ac25-2f1fe444d600",
                time: "2022-03-28 21:21:12.000",
                airTemperature: 29,
                sessionType: "P1",
                trackName: "Sakhir",
                trackTemperature: 36.00,
                weather: "Clean"
            }],
            selectedSession: null,
            events: [],
            laps: [],
            carTelemetries: [],
            carStatuses: [],
            motionsData: [],
        } as GlobalState),
    getters: {
        getSelectedSession(): Session | null {
            return this.selectedSession;
        },
        getEvents(): Event[] | null {
            return this.events;
        },
        getLaps(): Lap[] | null {
            return this.laps;
        },
        getCarTelemetries(): CarTelemetry[] | null {
            return this.carTelemetries;
        },
        getCarStatuses(): CarStatus[] | null {
            return this.carStatuses;
        },
        getMotionsData(): MotionData[] | null {
            return this.motionsData;
        }
    },
    actions: {
        allSessionsByUserID(userID: string): any {
            return this.sessions.filter(session => session.userID == userID);
        },
        fetchEvents(sessionID: number) {
            // contact DB
            // set data locally
            this.events = [];

            return true;
        },
        fetchLaps(sessionID: number): boolean {
            // contact DB
            // set data locally
            this.laps = [];

            return true;
        },
        fetchCarTelemetries(sessionID: number) {
            // contact DB
            // set data locally
            this.carTelemetries = [];

            return true;
        },
        fetchCarStatuses(sessionID: number): boolean {
            // contact DB
            // set data locally
            this.carStatuses = [];

            return true;
        },
        fetchMotionsData(sessionID: number): boolean {
            // contact DB
            // set data locally
            this.motionsData = [];

            return true;
        }
    },
});