
export interface Session {
    userID: string;
    time?: string;
    sessionID: number;
    airTemperature?: number;
    sessionType?: string;
    trackName?: string;
    trackTemperature?: number;
    weather?: string;
}

export interface Event {
    userID: string;
    time?: string;
    sessionID: number;
    fastestLapMs?: number;
    fastestLapStr?: string;
}

export interface Lap {
    userID: string;
    time?: string;
    sessionID: number;
    resultStatus?: string;
    gridStartPosition?: number;
    currentPosition?: number;
    currentLap?: number;
}

export interface CarTelemetry {
    userID: string;
    time?: string;
    sessionID: number;
    speed?: number;
    engineRPM?: number;
    engineTemperature?: number;
    brakeApplied?: number;
    throttleApplied?: number;
    brakeRL?: number;
    brakeRR?: number;
    brakeFL?: number;
    brakeFR?: number;
    tyre_pressureRL?: number;
    tyre_pressureRR?: number;
    tyre_pressureFL?: number;
    tyre_pressureFR?: number;
    tyre_inner_temperatureRL?: number;
    tyre_inner_temperatureRR?: number;
    tyre_inner_temperatureFL?: number;
    tyre_inner_temperatureFR?: number;
    tyre_surface_temperatureRL?: number;
    tyre_surface_temperatureRR?: number;
    tyre_surface_temperatureFL?: number;
    tyre_surface_temperatureFR?: number;
}

export interface CarStatus {
    userID: string;
    time?: string;
    sessionID: number;
    tyresAge?: number;
    fuelMix?: string;
    fuelCapacity?: number;
    fuelCurrent?: number;
    fuelRemainingInLaps?: number;
}

export interface MotionData {
    userID: string;
    time?: string;
    sessionID: number;
}
