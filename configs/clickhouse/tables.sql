CREATE TABLE participants (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,    
    ai_controlled Nullable(Int8) DEFAULT NULL,
    driver_id Nullable(Int8) DEFAULT NULL,
    driver_name Nullable(String) DEFAULT NULL,
    driver_nationality Nullable(String) DEFAULT NULL,
    driver_race_number Nullable(Int8) DEFAULT NULL,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL,
    is_teammate Nullable(Int8) DEFAULT NULL,
    team_id Nullable(Int8) DEFAULT NULL,
    team_name Nullable(String) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE participants_queue (
    user_id UUID,
    time DateTime,
    session_id String,
    ai_controlled Nullable(Int8) DEFAULT NULL,
    driver_id Nullable(Int8) DEFAULT NULL,
    driver_name Nullable(String) DEFAULT NULL,
    driver_nationality Nullable(String) DEFAULT NULL,
    driver_race_number Nullable(Int8) DEFAULT NULL,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL,
    is_teammate Nullable(Int8) DEFAULT NULL,
    team_id Nullable(Int8) DEFAULT NULL,
    team_name Nullable(String) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'participants',
       kafka_group_name = 'participants_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW participants_queue_mv TO participants AS
SELECT user_id, session_id, time, 
    ai_controlled,
    driver_id,
    driver_name,
    driver_nationality,
    driver_race_number,
    driver_vehicle_id,
    is_teammate,
    team_id,
    team_name
FROM participants_queue;

--------

CREATE TABLE session (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,    
    session_type Nullable(String) DEFAULT NULL,
    track_name Nullable(String) DEFAULT NULL,
    track_id Nullable(Int8) DEFAULT NULL,
    track_total_laps Nullable(Int8) DEFAULT NULL,
    track_lenght Nullable(Int16) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE session_queue (
    user_id UUID,
    time DateTime,
    session_id String,    
    session_type Nullable(String) DEFAULT NULL,
    track_name Nullable(String) DEFAULT NULL,
    track_id Nullable(Int8) DEFAULT NULL,
    track_total_laps Nullable(Int8) DEFAULT NULL,
    track_lenght Nullable(Int16) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'session',
       kafka_group_name = 'session_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;


CREATE MATERIALIZED VIEW session_queue_mv TO session AS
SELECT user_id, session_id, time, 
    session_type,
    track_name,
    track_id,
    track_total_laps,
    track_lenght
FROM session_queue;

--------

CREATE TABLE weather (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,
    weather_type Nullable(String) DEFAULT NULL,
    track_temperature Nullable(Float32) DEFAULT NULL,
    air_temperature Nullable(Int32) DEFAULT NULL,             
    forecast_weather_type Nullable(String) DEFAULT NULL,
    forecast_air_temperature Nullable(Int8) DEFAULT NULL,
    forecast_air_temperature_change Nullable(Int8) DEFAULT NULL,
    forecast_rain_percentage Nullable(Int8) DEFAULT NULL,
    forecast_time_offset Nullable(Float32) DEFAULT NULL,
    forecast_track_temperature Nullable(Int8) DEFAULT NULL,
    forecast_track_temperature_change Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE weather_queue (
    user_id UUID,
    time DateTime,
    session_id String,
    weather_type Nullable(String) DEFAULT NULL,
    track_temperature Nullable(Float32) DEFAULT NULL,
    air_temperature Nullable(Int32) DEFAULT NULL,
    forecast_weather_type Nullable(String) DEFAULT NULL,
    forecast_air_temperature Nullable(Int8) DEFAULT NULL,
    forecast_air_temperature_change Nullable(Int8) DEFAULT NULL,
    forecast_rain_percentage Nullable(Int8) DEFAULT NULL,
    forecast_time_offset Nullable(Float32) DEFAULT NULL,
    forecast_track_temperature Nullable(Int8) DEFAULT NULL,
    forecast_track_temperature_change Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'weather',
       kafka_group_name = 'weather_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;


CREATE MATERIALIZED VIEW weather_queue_mv TO weather AS
SELECT user_id, session_id, time, 
    weather_type,
    track_temperature,
    air_temperature, 
    forecast_weather_type,
    forecast_air_temperature,
    forecast_air_temperature_change,
    forecast_rain_percentage,
    forecast_time_offset,
    forecast_track_temperature,
    forecast_track_temperature_change
FROM weather_queue;

--------

CREATE TABLE fastest_lap (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,
    fastest_lap_ms Nullable(Int64) DEFAULT NULL,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE fastest_lap_queue (
    user_id UUID,
    time DateTime ,
    session_id String,
    fastest_lap_ms Nullable(Int64) DEFAULT NULL,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'fastest_lap',
       kafka_group_name = 'fastest_lap_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW fastest_lap_queue_mv TO fastest_lap AS
SELECT user_id, session_id, time,
    fastest_lap_ms,
    driver_vehicle_id
FROM fastest_lap_queue;

---------------------

CREATE TABLE retirement (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,    
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE retirement_queue (
    user_id UUID,
    time DateTime ,
    session_id String,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'retirement',
       kafka_group_name = 'retirement_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW retirement_queue_mv TO retirement AS
SELECT user_id, session_id, time, driver_vehicle_id
FROM retirement_queue;

---------------------

CREATE TABLE teammate_pit (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,    
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE teammate_pit_queue (
    user_id UUID,
    time DateTime ,
    session_id String,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'teammate_pit',
       kafka_group_name = 'teammate_pit_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW teammate_pit_queue_mv TO teammate_pit AS
SELECT user_id, session_id, time, driver_vehicle_id
FROM teammate_pit_queue;

---------------------

CREATE TABLE race_winner (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,    
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE race_winner_queue (
    user_id UUID,
    time DateTime ,
    session_id String,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'race_winner',
       kafka_group_name = 'race_winner_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW race_winner_queue_mv TO race_winner AS
SELECT user_id, session_id, time, driver_vehicle_id
FROM race_winner_queue;

---------------------

CREATE TABLE penalty (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,
    penalty_type Nullable(String) DEFAULT NULL,
    infrangement_type Nullable(String) DEFAULT NULL,
    lap_number Nullable(Int8) DEFAULT NULL,
    places_gained Nullable(Int8) DEFAULT NULL,
    penalty_time Nullable(Float32) DEFAULT NULL,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL,
    other_driver_vehicle_id Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE penalty_queue (
    user_id UUID,
    time DateTime ,
    session_id String,
    penalty_type Nullable(String) DEFAULT NULL,
    infrangement_type Nullable(String) DEFAULT NULL,
    lap_number Nullable(Int8) DEFAULT NULL,
    places_gained Nullable(Int8) DEFAULT NULL,
    penalty_time Nullable(Float32) DEFAULT NULL,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL,
    other_driver_vehicle_id Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'penalty',
       kafka_group_name = 'penalty_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW penalty_queue_mv TO penalty AS
SELECT user_id, session_id, time,
    penalty_type,
    infrangement_type,
    lap_number,
    places_gained,
    penalty_time,
    driver_vehicle_id,
    other_driver_vehicle_id
FROM penalty_queue;

---------------------

CREATE TABLE speed_trap (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,
    driver_fastest_in_session Nullable(Int8) DEFAULT NULL,
    overall_fastest_in_session Nullable(Int8) DEFAULT NULL,
    speed Nullable(Float32) DEFAULT NULL,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE speed_trap_queue (
    user_id UUID,
    time DateTime ,
    session_id String,
    driver_fastest_in_session Nullable(Int8) DEFAULT NULL,
    overall_fastest_in_session Nullable(Int8) DEFAULT NULL,
    speed Nullable(Float32) DEFAULT NULL,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'speed_trap',
       kafka_group_name = 'speed_trap_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW speed_trap_queue_mv TO speed_trap AS
SELECT user_id, session_id, time,
    driver_fastest_in_session,
    overall_fastest_in_session,
    speed,
    driver_vehicle_id

FROM speed_trap_queue;

---------------------

CREATE TABLE stop_go_served (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,    
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE stop_go_served_queue (
    user_id UUID,
    time DateTime ,
    session_id String,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'stop_go_served',
       kafka_group_name = 'stop_go_served_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW stop_go_served_queue_mv TO stop_go_served AS
SELECT user_id, session_id, time, driver_vehicle_id
FROM stop_go_served_queue;

---------------------

CREATE TABLE drive_through_served (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,    
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE drive_through_served_queue (
    user_id UUID,
    time DateTime ,
    session_id String,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'drive_through_served',
       kafka_group_name = 'drive_through_served_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW drive_through_served_queue_mv TO drive_through_served AS
SELECT user_id, session_id, time, driver_vehicle_id
FROM drive_through_served_queue;

---------------------

CREATE TABLE car_telemetry (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL,
    speed Nullable(Int32) DEFAULT NULL,
    throttle_applied Nullable(Float32) DEFAULT NULL,
    steer_applied Nullable(Float32) DEFAULT NULL,
    brake_applied Nullable(Float32) DEFAULT NULL,
    clutch_applied Nullable(Int8) DEFAULT NULL,
    gear Nullable(Int8) DEFAULT NULL,
    suggested_gear Nullable(Int8) DEFAULT NULL,
    drs Nullable(Int8) DEFAULT NULL,
    engine_rpm Nullable(Int32) DEFAULT NULL,
    engine_temperature Nullable(Int32) DEFAULT NULL,
    brake_rl Nullable(Int32) DEFAULT NULL,
    brake_rr Nullable(Int32) DEFAULT NULL,
    brake_fl Nullable(Int32) DEFAULT NULL,
    brake_fr Nullable(Int32) DEFAULT NULL,
    tyre_pressure_rl Nullable(Float32) DEFAULT NULL,
    tyre_pressure_rr Nullable(Float32) DEFAULT NULL,
    tyre_pressure_fl Nullable(Float32) DEFAULT NULL,
    tyre_pressure_fr Nullable(Float32) DEFAULT NULL,
    tyre_inner_temperature_rl Nullable(Int32) DEFAULT NULL,
    tyre_inner_temperature_rr Nullable(Int32) DEFAULT NULL,
    tyre_inner_temperature_fl Nullable(Int32) DEFAULT NULL,
    tyre_inner_temperature_fr Nullable(Int32) DEFAULT NULL,
    tyre_surface_temperature_rl Nullable(Int32) DEFAULT NULL,
    tyre_surface_temperature_rr Nullable(Int32) DEFAULT NULL,
    tyre_surface_temperature_fl Nullable(Int32) DEFAULT NULL,
    tyre_surface_temperature_fr Nullable(Int32) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE car_telemetry_queue (
    user_id UUID,
    time DateTime ,
    session_id String, 
    driver_vehicle_id Nullable(Int8) DEFAULT NULL,
    speed Nullable(Int32) DEFAULT NULL,
    throttle_applied Nullable(Float32) DEFAULT NULL,
    steer_applied Nullable(Float32) DEFAULT NULL,
    brake_applied Nullable(Float32) DEFAULT NULL,
    clutch_applied Nullable(Int8) DEFAULT NULL,
    gear Nullable(Int8) DEFAULT NULL,
    suggested_gear Nullable(Int8) DEFAULT NULL,
    drs Nullable(Int8) DEFAULT NULL,
    engine_rpm Nullable(Int32) DEFAULT NULL,
    engine_temperature Nullable(Int32) DEFAULT NULL,
    brake_rl Nullable(Int32) DEFAULT NULL,
    brake_rr Nullable(Int32) DEFAULT NULL,
    brake_fl Nullable(Int32) DEFAULT NULL,
    brake_fr Nullable(Int32) DEFAULT NULL,
    tyre_pressure_rl Nullable(Float32) DEFAULT NULL,
    tyre_pressure_rr Nullable(Float32) DEFAULT NULL,
    tyre_pressure_fl Nullable(Float32) DEFAULT NULL,
    tyre_pressure_fr Nullable(Float32) DEFAULT NULL,
    tyre_inner_temperature_rl Nullable(Int32) DEFAULT NULL,
    tyre_inner_temperature_rr Nullable(Int32) DEFAULT NULL,
    tyre_inner_temperature_fl Nullable(Int32) DEFAULT NULL,
    tyre_inner_temperature_fr Nullable(Int32) DEFAULT NULL,
    tyre_surface_temperature_rl Nullable(Int32) DEFAULT NULL,
    tyre_surface_temperature_rr Nullable(Int32) DEFAULT NULL,
    tyre_surface_temperature_fl Nullable(Int32) DEFAULT NULL,
    tyre_surface_temperature_fr Nullable(Int32) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'car_telemetry',
       kafka_group_name = 'car_telemetry_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW car_telemetry_queue_mv TO car_telemetry AS
SELECT user_id, session_id, time,
    driver_vehicle_id,
    speed,
    throttle_applied,
    steer_applied,
    brake_applied,
    clutch_applied,
    gear,
    suggested_gear,
    drs,
    engine_rpm,
    engine_temperature,
    brake_rl,
    brake_rr,
    brake_fl,
    brake_fr,
    tyre_pressure_rl,
    tyre_pressure_rr,
    tyre_pressure_fl,
    tyre_pressure_fr,
    tyre_inner_temperature_rl,
    tyre_inner_temperature_rr,
    tyre_inner_temperature_fl,
    tyre_inner_temperature_fr,
    tyre_surface_temperature_rl,
    tyre_surface_temperature_rr,
    tyre_surface_temperature_fl,
    tyre_surface_temperature_fr
FROM car_telemetry_queue;

-------------------------------

CREATE TABLE lap (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,
    driver_vehicle_id Nullable(Int64) DEFAULT NULL,
    last_lap_time_ms Nullable(Int64) DEFAULT NULL,
    current_lap_time_ms Nullable(Int64) DEFAULT NULL,
    sector_one_time_ms Nullable(Int64) DEFAULT NULL,
    sector_two_time_ms Nullable(Int64) DEFAULT NULL,
    lap_distance Nullable(Float32) DEFAULT NULL,
    total_distance Nullable(Float32) DEFAULT NULL,
    safety_car_delta Nullable(Float32) DEFAULT NULL,
    current_position Nullable(Int8) DEFAULT NULL,
    current_lap Nullable(Int8) DEFAULT NULL,
    pit_status Nullable(String) DEFAULT NULL,
    num_pit_stops Nullable(Int8) DEFAULT NULL,
    sector Nullable(Int8) DEFAULT NULL,
    current_lap_invalid Nullable(Int8) DEFAULT NULL,
    penalties_sec Nullable(Float32) DEFAULT NULL,
    num_warnings Nullable(Int8) DEFAULT NULL,
    num_unserved_drive_through_penalties Nullable(Int8) DEFAULT NULL,
    num_unserved_stop_go_penalties Nullable(Int8) DEFAULT NULL,
    grid_start_position Nullable(Int8) DEFAULT NULL,
    driver_status Nullable(String) DEFAULT NULL,
    result_status Nullable(String) DEFAULT NULL,
    pit_lane_timer_active Nullable(Int8) DEFAULT NULL,
    pit_lane_time_in_lane_ms Nullable(Int64) DEFAULT NULL,
    pit_stop_timer_in_ms Nullable(Int64) DEFAULT NULL,
    pit_stop_should_serve_penalty Nullable(Int8) DEFAULT NULL 
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE lap_queue (
    user_id UUID,
    time DateTime,
    session_id String,
    driver_vehicle_id Nullable(Int64) DEFAULT NULL,
    last_lap_time_ms Nullable(Int64) DEFAULT NULL,
    current_lap_time_ms Nullable(Int64) DEFAULT NULL,
    sector_one_time_ms Nullable(Int64) DEFAULT NULL,
    sector_two_time_ms Nullable(Int64) DEFAULT NULL,
    lap_distance Nullable(Float32) DEFAULT NULL,
    total_distance Nullable(Float32) DEFAULT NULL,
    safety_car_delta Nullable(Float32) DEFAULT NULL,
    current_position Nullable(Int8) DEFAULT NULL,
    current_lap Nullable(Int8) DEFAULT NULL,
    pit_status Nullable(String) DEFAULT NULL,
    num_pit_stops Nullable(Int8) DEFAULT NULL,
    sector Nullable(Int8) DEFAULT NULL,
    current_lap_invalid Nullable(Int8) DEFAULT NULL,
    penalties_sec Nullable(Float32) DEFAULT NULL,
    num_warnings Nullable(Int8) DEFAULT NULL,
    num_unserved_drive_through_penalties Nullable(Int8) DEFAULT NULL,
    num_unserved_stop_go_penalties Nullable(Int8) DEFAULT NULL,
    grid_start_position Nullable(Int8) DEFAULT NULL,
    driver_status Nullable(String) DEFAULT NULL,
    result_status Nullable(String) DEFAULT NULL,
    pit_lane_timer_active Nullable(Int8) DEFAULT NULL,
    pit_lane_time_in_lane_ms Nullable(Int64) DEFAULT NULL,
    pit_stop_timer_in_ms Nullable(Int64) DEFAULT NULL,
    pit_stop_should_serve_penalty Nullable(Int8) DEFAULT NULL 
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'lap',
       kafka_group_name = 'lap_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;


CREATE MATERIALIZED VIEW lap_queue_mv TO lap AS
SELECT user_id, session_id, time, 
    driver_vehicle_id,
    last_lap_time_ms,
    current_lap_time_ms,
    sector_one_time_ms,
    sector_two_time_ms,
    lap_distance,
    total_distance,
    safety_car_delta,
    current_position,
    current_lap,
    pit_status,
    num_pit_stops,
    sector,
    current_lap_invalid,
    penalties_sec,
    num_warnings,
    num_unserved_drive_through_penalties,
    num_unserved_stop_go_penalties,
    grid_start_position,
    driver_status,
    result_status,
    pit_lane_timer_active,
    pit_lane_time_in_lane_ms,
    pit_stop_timer_in_ms,
    pit_stop_should_serve_penalty
FROM lap_queue;

---------------------------

CREATE TABLE car_status (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,
    driver_vehicle_id Nullable(Int64) DEFAULT NULL,
    fuel_mix Nullable(String) DEFAULT NULL,
    fuel_capacity Nullable(Float32) DEFAULT NULL,
    fuel_current Nullable(Float32) DEFAULT NULL,
    fuel_remaining_in_laps Nullable(Float32) DEFAULT NULL,
    max_rpm Nullable(Int16) DEFAULT NULL,
    idle_rpm Nullable(Int16) DEFAULT NULL,
    max_gears Nullable(Int8) DEFAULT NULL,
    drs_allowed Nullable(Int8) DEFAULT NULL,
    actual_tyre_compound Nullable(String) DEFAULT NULL,
    visual_tyre_compound Nullable(String) DEFAULT NULL,
    tyres_age Nullable(Int8) DEFAULT NULL,
    fia_flag Nullable(String) DEFAULT NULL,
    ers_store_energy Nullable(Float32) DEFAULT NULL,
    ers_mode Nullable(String) DEFAULT NULL,
    ers_harvested_lap_mguk Nullable(Float32) DEFAULT NULL,
    ers_harvested_lap_mguh Nullable(Float32) DEFAULT NULL,
    ers_deployed_lap Nullable(Float32) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE car_status_queue (
    user_id UUID,
    time DateTime,
    session_id String,
    driver_vehicle_id Nullable(Int64) DEFAULT NULL,
    fuel_mix Nullable(String) DEFAULT NULL,
    fuel_capacity Nullable(Float32) DEFAULT NULL,
    fuel_current Nullable(Float32) DEFAULT NULL,
    fuel_remaining_in_laps Nullable(Float32) DEFAULT NULL,
    max_rpm Nullable(Int16) DEFAULT NULL,
    idle_rpm Nullable(Int16) DEFAULT NULL,
    max_gears Nullable(Int8) DEFAULT NULL,
    drs_allowed Nullable(Int8) DEFAULT NULL,
    actual_tyre_compound Nullable(String) DEFAULT NULL,
    visual_tyre_compound Nullable(String) DEFAULT NULL,
    tyres_age Nullable(Int8) DEFAULT NULL,
    fia_flag Nullable(String) DEFAULT NULL,
    ers_store_energy Nullable(Float32) DEFAULT NULL,
    ers_mode Nullable(String) DEFAULT NULL,
    ers_harvested_lap_mguk Nullable(Float32) DEFAULT NULL,
    ers_harvested_lap_mguh Nullable(Float32) DEFAULT NULL,
    ers_deployed_lap Nullable(Float32) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'car_status',
       kafka_group_name = 'car_status_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;

CREATE MATERIALIZED VIEW car_status_queue_mv TO car_status AS
SELECT user_id, session_id, time, 
    driver_vehicle_id,
    fuel_mix,
    fuel_capacity,
    fuel_current,
    fuel_remaining_in_laps,
    max_rpm,
    idle_rpm,
    max_gears,
    drs_allowed,
    actual_tyre_compound,
    visual_tyre_compound,
    tyres_age,
    fia_flag,
    ers_store_energy,
    ers_mode,
    ers_harvested_lap_mguk,
    ers_harvested_lap_mguh,
    ers_deployed_lap
FROM car_status_queue;

-----------------------------

CREATE TABLE motion_data (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id String,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL,
    world_position_x Nullable(Float32) DEFAULT NULL,
    world_position_y Nullable(Float32) DEFAULT NULL,
    world_position_z Nullable(Float32) DEFAULT NULL,
    world_velocity_x Nullable(Float32) DEFAULT NULL,
    world_velocity_y Nullable(Float32) DEFAULT NULL,
    world_velocity_z Nullable(Float32) DEFAULT NULL,
    world_forward_x Nullable(Int16) DEFAULT NULL,
    world_forward_y Nullable(Int16) DEFAULT NULL,
    world_forward_z Nullable(Int16) DEFAULT NULL,
    world_right_x Nullable(Int16) DEFAULT NULL,
    world_right_y Nullable(Int16) DEFAULT NULL,
    world_right_z Nullable(Int16) DEFAULT NULL,
    gforce_lateral Nullable(Float32) DEFAULT NULL,
    gforce_longitudinal Nullable(Float32) DEFAULT NULL,
    gforce_vertical Nullable(Float32) DEFAULT NULL,
    yaw Nullable(Float32) DEFAULT NULL,
    pitch Nullable(Float32) DEFAULT NULL,
    roll Nullable(Float32) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE motion_data_queue (
    user_id UUID,
    time DateTime,
    session_id String,
    driver_vehicle_id Nullable(Int8) DEFAULT NULL,
    world_position_x Nullable(Float32) DEFAULT NULL,
    world_position_y Nullable(Float32) DEFAULT NULL,
    world_position_z Nullable(Float32) DEFAULT NULL,
    world_velocity_x Nullable(Float32) DEFAULT NULL,
    world_velocity_y Nullable(Float32) DEFAULT NULL,
    world_velocity_z Nullable(Float32) DEFAULT NULL,
    world_forward_x Nullable(Int16) DEFAULT NULL,
    world_forward_y Nullable(Int16) DEFAULT NULL,
    world_forward_z Nullable(Int16) DEFAULT NULL,
    world_right_x Nullable(Int16) DEFAULT NULL,
    world_right_y Nullable(Int16) DEFAULT NULL,
    world_right_z Nullable(Int16) DEFAULT NULL,
    gforce_lateral Nullable(Float32) DEFAULT NULL,
    gforce_longitudinal Nullable(Float32) DEFAULT NULL,
    gforce_vertical Nullable(Float32) DEFAULT NULL,
    yaw Nullable(Float32) DEFAULT NULL,
    pitch Nullable(Float32) DEFAULT NULL,
    roll Nullable(Float32) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka-1:29092,kafka-2:29093,kafka-3:29094',
       kafka_topic_list = 'motion_data',
       kafka_group_name = 'motion_data_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 3;


CREATE MATERIALIZED VIEW motion_data_queue_mv TO motion_data AS
SELECT user_id, session_id, time,
    driver_vehicle_id,
    world_position_x,
    world_position_y,
    world_position_z,
    world_velocity_x,
    world_velocity_y,
    world_velocity_z,
    world_forward_x,
    world_forward_y,
    world_forward_z,
    world_right_x,
    world_right_y,
    world_right_z,
    gforce_lateral,
    gforce_longitudinal,
    gforce_vertical,
    yaw,
    pitch,
    roll
FROM motion_data_queue;