CREATE TABLE session (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id Int32,
    air_temperature Nullable(Int32) DEFAULT NULL, 
    session_type Nullable(Int32) DEFAULT NULL,
    track_name Nullable(String) DEFAULT NULL,
    track_temperature Nullable(Decimal(5,2)) DEFAULT NULL,
    weather Nullable(String) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE session_queue (
    user_id UUID,
    time DateTime,
    session_id Int32,
    air_temperature Nullable(Int32) DEFAULT NULL, 
    session_type Nullable(String) DEFAULT NULL,
    track_name Nullable(String) DEFAULT NULL,
    track_temperature Nullable(Decimal(5,2)) DEFAULT NULL,
    weather Nullable(String) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka:29092',
       kafka_topic_list = 'session',
       kafka_group_name = 'session_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 1;


CREATE MATERIALIZED VIEW session_queue_mv TO session AS
SELECT user_id, session_id, time, air_temperature, session_type, track_name, track_temperature, weather
FROM session_queue;


--------

CREATE TABLE event (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id Int32,
    fastest_lap Nullable(DateTime) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE event_queue (
    user_id UUID,
    time DateTime ,
    session_id Int32,
    fastest_lap Nullable(DateTime) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka:29092',
       kafka_topic_list = 'event',
       kafka_group_name = 'event_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 1;


CREATE MATERIALIZED VIEW event_queue_mv TO event AS
SELECT user_id, session_id, time, fastest_lap
FROM event_queue;

---------------------


CREATE TABLE car_telemetry (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id Int32,    
    speed Nullable(Int32) DEFAULT NULL,
    engine_rpm Nullable(Int32) DEFAULT NULL,
    engine_temperature Nullable(Int32) DEFAULT NULL,
    brake_applied Nullable(Decimal(5,2)) DEFAULT NULL,
    throttle_applied Nullable(Decimal(5,2)) DEFAULT NULL,
    brake_rl Nullable(Int32) DEFAULT NULL,
    brake_rr Nullable(Int32) DEFAULT NULL,
    brake_fl Nullable(Int32) DEFAULT NULL,
    brake_fr Nullable(Int32) DEFAULT NULL,
    tyre_pressure_rl Nullable(Decimal(5,2)) DEFAULT NULL,
    tyre_pressure_rr Nullable(Decimal(5,2)) DEFAULT NULL,
    tyre_pressure_fl Nullable(Decimal(5,2)) DEFAULT NULL,
    tyre_pressure_fr Nullable(Decimal(5,2)) DEFAULT NULL,
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
    session_id Int32,
    speed Nullable(Int32) DEFAULT NULL,
    engine_rpm Nullable(Int32) DEFAULT NULL,
    engine_temperature Nullable(Int32) DEFAULT NULL,
    brake_applied Nullable(Decimal(5,2)) DEFAULT NULL,
    throttle_applied Nullable(Decimal(5,2)) DEFAULT NULL,
    brake_rl Nullable(Int32) DEFAULT NULL,
    brake_rr Nullable(Int32) DEFAULT NULL,
    brake_fl Nullable(Int32) DEFAULT NULL,
    brake_fr Nullable(Int32) DEFAULT NULL,
    tyre_pressure_rl Nullable(Decimal(5,2)) DEFAULT NULL,
    tyre_pressure_rr Nullable(Decimal(5,2)) DEFAULT NULL,
    tyre_pressure_fl Nullable(Decimal(5,2)) DEFAULT NULL,
    tyre_pressure_fr Nullable(Decimal(5,2)) DEFAULT NULL,
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
SETTINGS kafka_broker_list = 'kafka:29092',
       kafka_topic_list = 'car_telemetry',
       kafka_group_name = 'car_telemetry_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 1;


CREATE MATERIALIZED VIEW car_telemetry_queue_mv TO car_telemetry AS
SELECT user_id, session_id, time, speed,
    engine_rpm,
    engine_temperature,
    brake_applied,
    throttle_applied,
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
    session_id Int32,
    result_status Nullable(String) DEFAULT NULL,
	grid_start_position Nullable(Int32) DEFAULT NULL,
	current_position Nullable(Int32) DEFAULT NULL,
	current_lap Nullable(Int32) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE lap_queue (
    user_id UUID,
    time DateTime,
    session_id Int32,
    result_status Nullable(String) DEFAULT NULL,
	grid_start_position Nullable(Int32) DEFAULT NULL,
	current_position Nullable(Int32) DEFAULT NULL,
	current_lap Nullable(Int32) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka:29092',
       kafka_topic_list = 'lap',
       kafka_group_name = 'lap_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 1;


CREATE MATERIALIZED VIEW lap_queue_mv TO lap AS
SELECT user_id, session_id, time, 
    result_status,
	grid_start_position,
	current_position,
	current_lap
FROM lap_queue;

---------------------------

CREATE TABLE car_status (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id Int32,
    tyres_age Nullable(Int32) DEFAULT NULL,
    fuel_mix Nullable(String) DEFAULT NULL,
    fuel_capacity Nullable(Decimal(5,2)) DEFAULT NULL,
    fuel_current Nullable(Decimal(5,2)) DEFAULT NULL,
    fuel_remaining_in_laps Nullable(Decimal(5,2)) DEFAULT NULL
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE car_status_queue (
    user_id UUID,
    time DateTime,
    session_id Int32,
    tyres_age Nullable(Int32) DEFAULT NULL,
    fuel_mix Nullable(String) DEFAULT NULL,
    fuel_capacity Nullable(Decimal(5,2)) DEFAULT NULL,
    fuel_current Nullable(Decimal(5,2)) DEFAULT NULL,
    fuel_remaining_in_laps Nullable(Decimal(5,2)) DEFAULT NULL
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka:29092',
       kafka_topic_list = 'car_status',
       kafka_group_name = 'car_status_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 1;

CREATE MATERIALIZED VIEW car_status_queue_mv TO car_status AS
SELECT user_id, session_id, time, 
    tyres_age,
    fuel_mix,
    fuel_capacity,
    fuel_current,
    fuel_remaining_in_laps
FROM car_status_queue;

-----------------------------

CREATE TABLE motion_data (
    user_id UUID,
    time DateTime,
    date ALIAS toDate(time),
    session_id Int32    
) Engine = MergeTree
PARTITION BY toYYYYMM(time)
ORDER BY (session_id, time);

CREATE TABLE motion_data_queue (
    user_id UUID,
    time DateTime ,
    session_id Int32
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'kafka:29092',
       kafka_topic_list = 'motion_data',
       kafka_group_name = 'motion_data_consumer_group1',
       kafka_format = 'JSONEachRow',
       kafka_num_consumers = 1;


CREATE MATERIALIZED VIEW motion_data_queue_mv TO motion_data AS
SELECT user_id, session_id, time
FROM motion_data_queue;