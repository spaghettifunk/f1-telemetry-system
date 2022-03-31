
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
    tyrePressureRL?: number;
    tyrePressureRR?: number;
    tyrePressureFL?: number;
    tyrePressureFR?: number;
    tyreInnerTemperatureRL?: number;
    tyreInnerTemperatureRR?: number;
    tyreInnerTemperatureFL?: number;
    tyreInnerTemperatureFR?: number;
    tyreSurfaceTemperatureRL?: number;
    tyreSurfaceTemperatureRR?: number;
    tyreSurfaceTemperatureFL?: number;
    tyreSurfaceTemperatureFR?: number;
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
