import { ClickHouseClient } from '@depyronick/clickhouse-client';
import { Router } from 'express';

const routes = Router();

const telemetryServer = new ClickHouseClient({
    host: 'localhost'
});

// userID: "7f443b8f-1cad-4d00-ac25-2f1fe444d600"
// sessionID: -397947032
/*
telemetryServer
    .queryPromise(
        `SELECT * FROM session limit 3`
    )
    .then((rows) => {
        // all retrieved rows
        res.statusCode = 200;
        res.send(rows);
        return res;
    })
    .catch((err) => {
        // called when an error occurred during query
        res.statusCode = 500;
        res.send({ msg: err });
        return res
    });
*/


routes.get('/', (req, res) => {
    return res.json({ version: "v0.0.1" });
});

routes.get('/users/:id/sessions', (req, res) => {
    const id = req.params.id;

    telemetryServer
        .queryPromise(
            `SELECT session_id,MIN(time), air_temperature,
            session_type, track_name,
            track_temperature, weather
            FROM session
            WHERE user_id = '${id}'
            GROUP BY session_id, air_temperature,
            session_type, track_name,
            track_temperature, weather`
        )
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send(rows);
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
        SELECT session_id, air_temperature, MIN(time) as time,
        session_type, track_name,
        track_temperature, weather 
        FROM session 
        WHERE session_id = '${sessionID}' AND user_id = '${id}'
        GROUP BY session_id, air_temperature,
        session_type, track_name,
        track_temperature, weather
        `)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send(rows);
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
        .queryPromise(``)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send(rows);
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
        SELECT session_id, MAX(time) as time,
        fastest_lap_ms, fastest_lap_str
        FROM event 
        WHERE session_id = '${sessionID}' AND user_id = '${id}'
        GROUP BY session_id, fastest_lap_ms, fastest_lap_str        
        `)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send(rows);
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
        .queryPromise(`SELECT * FROM car_telemetry WHERE session_id = '${sessionID}' AND user_id = '${id}'`)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send(rows);
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
        .queryPromise(`SELECT * FROM car_status WHERE session_id = '${sessionID}' AND user_id = '${id}'`)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send(rows);
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
        .queryPromise(`SELECT * FROM motion_data WHERE session_id = '${sessionID}' AND user_id = '${id}'`)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.send(rows);
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