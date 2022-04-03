import { ClickHouseClient } from '@depyronick/clickhouse-client';
import { Router } from 'express';

const routes = Router();

const telemetryServer = new ClickHouseClient({
    host: 'localhost'
});

routes.get('/', (req, res) => {
    return res.json({ version: "v0.0.1" });
});

routes.get('/users/:id/sessions', (req, res) => {
    const id = req.params.id;

    telemetryServer
        .queryPromise(
            `SELECT session_id, MIN(time) as time, session_type, track_name
            FROM session
            WHERE user_id = '${id}'
            GROUP BY session_id, session_type, track_name
            ORDER BY time DESC`
        )
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send({
                count: rows.length,
                data: rows
            });
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
        SELECT session_id, air_temperature, time,
        session_type, track_name,
        track_temperature, weather 
        FROM session 
        WHERE session_id = '${sessionID}' AND user_id = '${id}'
        GROUP BY session_id, air_temperature, time,
        session_type, track_name,
        track_temperature, weather
        ORDER BY time
        `)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send({
                count: rows.length,
                data: rows
            });
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/laps', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`SELECT result_status, grid_start_position, current_position, current_lap, time
        FROM lap
        WHERE session_id = '${sessionID}' AND user_id = '${id}'
        GROUP BY result_status, grid_start_position, current_position, current_lap, time
        ORDER BY time`)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send({
                count: rows.length,
                data: rows
            });
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/events', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
        SELECT session_id, MIN(fastest_lap_ms), fastest_lap_str
        FROM event 
        WHERE session_id = '${sessionID}' AND user_id = '${id}'
        GROUP BY session_id, fastest_lap_ms, fastest_lap_str        
        `)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send({
                count: rows.length,
                data: rows
            });
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/telemetries', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
        SELECT * 
        FROM car_telemetry 
        WHERE session_id = '${sessionID}' AND user_id = '${id}'
        ORDER BY time`
        )
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send({
                count: rows.length,
                data: rows
            });
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/statuses', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
        SELECT * 
        FROM car_status 
        WHERE session_id = '${sessionID}' AND user_id = '${id}'
        ORDER BY time`
        )
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send({
                count: rows.length,
                data: rows
            });
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/motions-data', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
        SELECT * 
        FROM motion_data 
        WHERE session_id = '${sessionID}' AND user_id = '${id}'
        ORDER BY time`
        )
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send({
                count: rows.length,
                data: rows
            });
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

export default routes;