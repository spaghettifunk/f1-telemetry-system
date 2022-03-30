import { Session, Event, Lap, CarTelemetry, CarStatus, MotionData } from '../models/telemetry.model';
import { defineStore } from 'pinia';

export type GlobalState = {
    sessions: Session[] | [];
    events: Event[] | [];
    laps: Lap[] | [];
    carTelemetries: CarTelemetry[] | [];
    carStatuses: CarStatus[] | [];
    motionsData: MotionData[] | [];
    selectedSession: Session | null;
};

export const useGlobalStore = defineStore({
    id: "globalStore",
    state: () => (
        {
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
            events: [],
            laps: [],
            carTelemetries: [],
            carStatuses: [],
            motionsData: [],
            selectedSession: null,
        } as GlobalState),
    getters: {
        getSelectedSession(): Session | null {
            return this.selectedSession;
        },
    },
    actions: {
        allSessionsByUserID(userID: string): any {
            return this.sessions.filter(session => session.userID == userID);
        },
        getSessionData(sessionID: number) {
            console.log(sessionID);
            var sessions = this.sessions.filter(session => session.sessionID == sessionID);
            if (sessions.length > 0) {
                return sessions[0];
            }
            return { userID: -1, sessionID: -1, airTemperature: -1, sessionType: "", time: "", trackName: "", trackTemperature: -1, weather: "" };
        },
    },
});