
interface Session {
    userID: string;
    time?: string;
    sessionID: number;
    sessionType?: string;
    trackName?: string;
    trackID?: number;
    trackTotalLaps?: number;
    trackLenght?: number;
}

interface Lap {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
    lastLapTimeMS?: number;
    currentLapTimeMS?: number;
    sectorOneTimeMS?: number;
    sectorTwoTimeMS?: number;
    lapDistance?: number;
    totalDistance?: number;
    safetyCarDelta?: number;
    currentPosition?: number;
    currentLap?: number;
    pitStatus?: string;
    numPitStops?: number;
    sector?: number;
    currentLapInvalID?: number;
    penaltiesSec?: number;
    numWarnings?: number;
    numUnservedDriveThroughPenalties?: number;
    numUnservedStopGoPenalties?: number;
    gridStartPosition?: number;
    driverStatus?: string;
    resultStatus?: string;
    pitLaneTimerActive?: number;
    pitLaneTimeInLaneMS?: number;
    pitStopTimerInMS?: number;
    pitStopShouldServePenalty?: number;
}

interface CarTelemetry {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
    speed?: number;
    throttleApplied?: number;
    steerApplied?: number;
    brakeApplied?: number;
    clutchApplied?: number;
    gear?: number;
    suggestedGear?: number;
    drs?: number;
    engineRPM?: number;
    engineTemperature?: number;
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

interface CarStatus {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
    fuelMix?: string;
    fuelCapacity?: number;
    fuelCurrent?: number;
    fuelRemainingInLaps?: number;
    maxRPM?: number;
    IDleRPM?: number;
    maxGears?: number;
    drsAllowed?: number;
    actualTyreCompound?: string;
    visualTyreCompound?: string;
    tyresAge?: number;
    fiaFlag?: number;
    ersStoreEnergy?: number;
    ersMode?: string;
    ersHarvestedLapMGUK?: number;
    ersHarvestedLapMGUH?: number;
    ersDeployedLap?: number;
}

interface MotionData {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
    worldPositionX?: number;
    worldPositionY?: number;
    worldPositionZ?: number;
    worldVelocityX?: number;
    worldVelocityY?: number;
    worldVelocityZ?: number;
    worldForwardX?: number;
    worldForwardY?: number;
    worldForwardZ?: number;
    worldRightX?: number;
    worldRightY?: number;
    worldRightZ?: number;
    gforceLateral?: number;
    gforceLongitudinal?: number;
    gforceVertical?: number;
    yaw?: number;
    pitch?: number;
    roll?: number;
}

interface Participant {
    userID: string;
    time?: string;
    sessionID: number;
    aiControlled?: number;
    driverID?: number;
    driverName?: string;
    driverNationality?: string;
    driverRaceNumber?: number;
    driverVehicleID?: number;
    isTeammate?: number;
    teamID?: number;
    teamName?: string;
}

interface Weather {
    userID: string;
    time?: string;
    sessionID: number;
    weatherType?: string;
    trackTemperature?: number;
    airTemperature?: number;
    forecastWeatherType?: string;
    forecastAirTemperature?: number;
    forecastAirTemperatureChange?: number;
    forecastRainPercentage?: number;
    forecastTimeOffset?: number;
    forecastTrackTemperature?: number;
    forecastTrackTemperatureChange?: number;
}

interface FastestLap {
    userID: string;
    time?: string;
    sessionID: number;
    fastestLapMS?: number;
    driverVehicleID?: number;
}

interface Retirement {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
}

interface TeammatePit {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
}

interface RaceWinner {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
}

interface Penalty {
    userID: string;
    time?: string;
    sessionID: number;
    penaltyType?: string;
    infrangementType?: string;
    lapNumber?: number;
    placesGained?: number;
    penaltyTime?: number;
    driverVehicleID?: number;
    otherDriverVehicleID?: number;
}

interface SpeedTrap {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
    driverFastestInSession?: number;
    overallFastestInSession?: number;
    speed?: number;
}

interface StopGoServed {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
}

interface DriveThroughServed {
    userID: string;
    time?: string;
    sessionID: number;
    driverVehicleID?: number;
}

export {
    Session,
    Lap,
    CarTelemetry,
    CarStatus,
    MotionData,
    Participant,
    Weather,
    FastestLap,
    Retirement,
    TeammatePit,
    RaceWinner,
    Penalty,
    SpeedTrap,
    StopGoServed,
    DriveThroughServed
}