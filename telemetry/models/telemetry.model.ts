
interface Session {
    user_id: string;
    time?: string;
    session_id: string;
    session_type?: string;
    track_name?: string;
    track_id?: number;
    track_total_laps?: number;
    track_lenght?: number;
}

interface Lap {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
    last_lap_time_ms?: number;
    current_lap_time_ms?: number;
    sector_one_time_ms?: number;
    sector_two_time_ms?: number;
    lap_distance?: number;
    total_distance?: number;
    safety_car_delta?: number;
    current_position?: number;
    current_lap?: number;
    pit_status?: string;
    num_pit_stops?: number;
    sector?: number;
    current_lap_invalid?: number;
    penalties_sec?: number;
    num_warnings?: number;
    num_unserved_drive_through_penalties?: number;
    num_unserved_stop_go_penalties?: number;
    grid_start_position?: number;
    driver_status?: string;
    result_status?: string;
    pit_lane_timer_active?: number;
    pit_lane_time_in_lane_ms?: number;
    pit_stop_timer_in_ms?: number;
    pit_stop_should_serve_penalty?: number;
}

interface CarTelemetry {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
    speed?: number;
    throttle_applied?: number;
    steer_applied?: number;
    brake_applied?: number;
    clutch_applied?: number;
    gear?: number;
    suggested_gear?: number;
    drs?: number;
    engine_rpm?: number;
    engine_temperature?: number;
    brake_rl?: number;
    brake_rr?: number;
    brake_fl?: number;
    brake_fr?: number;
    tyre_pressure_rl?: number;
    tyre_pressure_rr?: number;
    tyre_pressure_fl?: number;
    tyre_pressure_fr?: number;
    tyre_inner_temperature_rl?: number;
    tyre_inner_temperature_rr?: number;
    tyre_inner_temperature_fl?: number;
    tyre_inner_temperature_fr?: number;
    tyre_surface_temperature_rl?: number;
    tyre_surface_temperature_rr?: number;
    tyre_surface_temperature_fl?: number;
    tyre_surface_temperature_fr?: number;
}

interface CarStatus {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
    fuel_mix?: string;
    fuel_capacity?: number;
    fuel_current?: number;
    fuel_remaining_in_laps?: number;
    max_rpm?: number;
    idle_rpm?: number;
    max_gears?: number;
    drs_allowed?: number;
    actual_tyre_compound?: string;
    visual_tyre_compound?: string;
    tyres_age?: number;
    fia_flag?: string;
    ers_store_energy?: number;
    ers_mode?: string;
    ers_harvested_lap_mguk?: number;
    ers_harvested_lap_mguh?: number;
    ers_deployed_lap?: number;
}

interface MotionData {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
    world_position_x?: number;
    world_position_y?: number;
    world_position_z?: number;
    world_velocity_x?: number;
    world_velocity_y?: number;
    world_velocity_z?: number;
    world_forward_x?: number;
    world_forward_y?: number;
    world_forward_z?: number;
    world_right_x?: number;
    world_right_y?: number;
    world_right_z?: number;
    gforce_lateral?: number;
    gforce_longitudinal?: number;
    gforce_vertical?: number;
    yaw?: number;
    pitch?: number;
    roll?: number;
}

interface Participant {
    user_id: string;
    time?: string;
    session_id: string;
    air_temperature?: number;
    ai_controlled?: number;
    driver_id?: number;
    driver_name?: string;
    driver_nationality?: string;
    driver_race_number?: number;
    driver_vehicle_id?: number;
    is_teammate?: number;
    team_id?: number;
    team_name?: string;
}

interface Weather {
    user_id: string;
    time?: string;
    session_id: string;
    weather_type?: string;
    track_temperature?: number;
    air_temperature?: number;
    forecast_weather_type?: string;
    forecast_air_temperature?: number;
    forecast_air_temperature_change?: number;
    forecast_rain_percentage?: number;
    forecast_time_offset?: number;
    forecast_track_temperature?: number;
    forecast_track_temperature_change?: number;
}

interface FastestLap {
    user_id: string;
    time?: string;
    session_id: string;
    fastestLapMS?: number;
    driver_vehicle_id?: number;
}

interface Retirement {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
}

interface TeammatePit {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
}

interface RaceWinner {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
}

interface Penalty {
    user_id: string;
    time?: string;
    session_id: string;
    penalty_type?: string;
    infrangement_type?: string;
    lap_number?: number;
    places_gained?: number;
    penalty_time?: number;
    driver_vehicle_id?: number;
    other_driver_vehicle_id?: number;
}

interface SpeedTrap {
    user_id: string;
    time?: string;
    session_id: string;
    driver_fastest_in_session?: number;
    overall_fastest_in_session?: number;
    speed?: number;
    driver_vehicle_id?: number;
}

interface StopGoServed {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
}

interface DriveThroughServed {
    user_id: string;
    time?: string;
    session_id: string;
    driver_vehicle_id?: number;
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