package telemetry

// Track IDs
type Weather uint8

var weathers = map[Weather]string{
	0: "Clean",
	1: "LightCloud",
	2: "Overcast",
	3: "LightRain",
	4: "HeavyRain",
	5: "Storm",
}

func (w Weather) String() string {
	return weathers[w]
}

// Result status
type ResultStatus uint8

var resultStatuses = map[ResultStatus]string{
	0: "ResultInvalid",
	1: "ResultInactive",
	2: "ResultActive",
	3: "ResultFinished",
	4: "ResultDisqualified",
	5: "ResultNotClassified",
	6: "ResultRetired",
}

func (rs ResultStatus) String() string {
	return resultStatuses[rs]
}

// Driver Status
type DriverStatus uint8

var driverStatuses = map[DriverStatus]string{
	0: "DriverInGarage",
	1: "DriverFlyingLap",
	2: "DriverInLap",
	3: "DriverOutLap",
	4: "DriverOnTrack",
}

func (ds DriverStatus) String() string {
	return driverStatuses[ds]
}

// Pit Status
type PitStatus uint8

var pitStatuses = map[PitStatus]string{
	0: "PitNone",
	1: "PitPitting",
	2: "PitInPitArea",
}

func (ps PitStatus) String() string {
	return pitStatuses[ps]
}

// Safety Car Status
type SafetyCarStatus uint8

var safetyCarStatuses = map[SafetyCarStatus]string{
	0: "SafetyCarNo",
	1: "SafetyCarFull",
	2: "SafetyCarVirtual",
}

func (scs SafetyCarStatus) String() string {
	return safetyCarStatuses[scs]
}

// Ready Status
type ReadyStatus uint8

var readyStatuses = map[ReadyStatus]string{
	0: "NotReady",
	1: "Ready",
	2: "Spectating",
}

func (rs ReadyStatus) String() string {
	return readyStatuses[rs]
}

// Fuel Mix
type FuelMix uint8

var fuelMixes = map[FuelMix]string{
	0: "FuelMixLean",
	1: "FuelMixStandard",
	2: "FuelMixRich",
	3: "FuelMixMax",
}

func (f FuelMix) String() string {
	return fuelMixes[f]
}

// ERS Deploy Mode
type ERSMode uint8

var ersModes = map[ERSMode]string{
	0: "ERSDeployModeNone",
	1: "ERSDeployModeMedium",
	2: "ERSDeployModeOvertake",
	3: "ERSDeployModeHotLap",
}

func (f ERSMode) String() string {
	return ersModes[f]
}

// Penalty type
type Penalty uint8

var penalties = map[Penalty]string{
	0:  "DriveThrough",
	1:  "StopGo",
	2:  "Grid",
	3:  "Reminder",
	4:  "Time",
	5:  "Warning",
	6:  "Disqualified",
	7:  "RemoveFromFormationLap",
	8:  "ParkedTooLongTimer",
	9:  "TypeRegulations",
	10: "ThisLapInvalidated",
	11: "ThisAndNextNextLapInvalidated",
	12: "ThisLapInvalidatedWithoutReason",
	13: "ThisAndNextLapInvalidatedWithoutReason",
	14: "ThisAndPrevLapInvalidated",
	15: "ThisAndPrevLapInvalidatedWithoutReason",
	16: "Retired",
	17: "BlackFlagTimer",
}

func (p Penalty) String() string {
	return penalties[p]
}

// Infrangement type
type Infrangement uint8

var infrangements = map[Infrangement]string{
	0:  "BlockingBySlowDriving",
	1:  "BlockingByWrongWayDriving",
	2:  "ReversingOffTheStartLine",
	3:  "BigCollision",
	4:  "SmallCollision",
	5:  "CollisionFailedToHandBackPositionSingle",
	6:  "CollisionFailedToHandBackPositionMultiple",
	7:  "CornerCuttingGainedTime",
	8:  "CornerCuttingOvertakeSingle",
	9:  "CornerCuttingOvertakeMultiple",
	10: "CrossedPitExitLane",
	11: "IgnoringBlueFlags",
	12: "IgnoringYellowFlags",
	13: "IgnoringDriveThrough",
	14: "TooManyDriveThroughs",
	15: "DriveThroughReminderServeWithinNLaps",
	16: "DriveThroughReminderServeThisLap",
	17: "PitLaneSpeeding",
	18: "ParkedForTooLong",
	19: "IgnoringTyreRegulations",
	20: "TooManyPenalties",
	21: "MultipleWarnings",
	22: "ApproachingDisqualification",
	23: "TyreRegulationsSelectSingle",
	24: "TyreRegulationsSelectMultiple",
	25: "LapInvalidatedCornerCutting",
	26: "LapInvalidatedRunningWide",
	27: "CornerCuttingRanWideGainedTimeMinor",
	28: "CornerCuttingRanWideGainedTimeSignificant",
	29: "CornerCuttingRanWideGainedTimeExtreme",
	30: "LapInvalidatedWallRiding",
	31: "LapInvalidatedFlashbackUsed",
	32: "LapInvalidatedResetToTrack",
	33: "BlockingThePitLane",
	34: "JumpStart",
	35: "SafetyCarToCarCollision",
	36: "SafetyCarIllegalOvertake",
	37: "SafetyCarExceedingAllowedPace",
	38: "VirtualSafetyCarExceedingAllowedPace",
	39: "FormationLapBelowAllowedSpeed",
	40: "RetiredMechanicalFailure",
	41: "RetiredTerminallyDamaged",
	42: "SafetyCarFallingTooFarBack",
	43: "BlackFlagTimer",
	44: "UnServedStopGoPenalty",
	45: "UnServedDriveThroughPenalty",
	46: "EngineComponentChange",
	47: "GearboxChange",
	48: "LeagueGridPenalty",
	49: "RetryPenalty",
	50: "IllegalTimeGain",
	51: "MandatoryPitStop",
}

func (i Infrangement) String() string {
	return infrangements[i]
}

// F1 Modern
type ActualTyreCompound uint8

var actualTyreCompunds = map[ActualTyreCompound]string{
	7:  "Inter",
	8:  "Wet",
	9:  "Dry",
	10: "WetClassic",
	11: "SuperSoft",
	12: "Soft",
	13: "Medium",
	14: "Hard",
	15: "WetF2",
	16: "C5",
	17: "C4",
	18: "C3",
	19: "C2",
	20: "C1",
}

func (m ActualTyreCompound) String() string {
	return actualTyreCompunds[m]
}

// Visual Tyre Compounds
// F2 Classic and F2 same as above.
type VisualTyreCompound uint8

var visualTyreCompounds = map[VisualTyreCompound]string{
	16: "Soft",
	17: "Medium",
	18: "Hard",
	7:  "Inter",
	8:  "Wet",
}

func (i VisualTyreCompound) String() string {
	return visualTyreCompounds[i]
}

// Vehicle FIA Flags
type FIAFlags int8

var flags = map[FIAFlags]string{
	-1: "Invalid",
	0:  "None",
	1:  "Green",
	2:  "Blue",
	3:  "Yellow",
	4:  "Red",
}

func (i FIAFlags) String() string {
	return flags[i]
}
