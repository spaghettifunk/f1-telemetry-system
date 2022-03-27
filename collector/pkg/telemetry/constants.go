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
