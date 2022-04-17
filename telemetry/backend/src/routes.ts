import { ClickHouseClient } from '@depyronick/clickhouse-client';
import { Router } from 'express';

const routes = Router();

const telemetryServer = new ClickHouseClient({
    host: 'localhost'
});

routes.get('/', (req, res) => {
    return res.json({ version: "v0.0.2" });
});

routes.get('/users/:id/sessions', (req, res) => {
    const id = req.params.id;

    telemetryServer
        .queryPromise(`
            SELECT session_id, MIN(time) as time, session_type, track_name, track_id, track_total_laps, track_lenght
            FROM session
            WHERE user_id = '${id}'
            GROUP BY session_id, session_type, track_name, track_id, track_total_laps, track_lenght
            ORDER BY time DESC
        `)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
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
            SELECT *
            FROM session 
            WHERE session_id = '${sessionID}' AND user_id = '${id}'            
            LIMIT 1
        `)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/participants', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT 
                ai_controlled,
                driver_id,
                driver_name,
                driver_nationality,
                driver_race_number,
                driver_vehicle_id,
                is_teammate,
                team_id,
                team_name
            FROM participants
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            GROUP BY ai_controlled, driver_id, driver_name, driver_nationality, 
                     driver_race_number, driver_vehicle_id, is_teammate, team_id, 
                     team_name
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/weather', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM weather
            WHERE session_id = '${sessionID}' AND user_id = '${id}'            
            ORDER BY time
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/fastest-lap', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM fastest_lap
            WHERE session_id = '${sessionID}' AND user_id = '${id}'            
            ORDER BY time ASC
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/retirements', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM retirement
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/teammate-pits', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM teammate_pit
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/race-winner', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM race_winner
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time ASC
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/penalties', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM penalty
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/speed-traps', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM speed_trap
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time ASC
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/stop-go-served', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM stop_go_served
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/drive-through-served', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT *
            FROM drive_through_served
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
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
        .queryPromise(`
            SELECT *
            FROM lap
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time
        `)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/car-telemetry', (req, res) => {
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
            res.json(rows);
            return res;
        })
        .catch((err) => {
            // called when an error occurred during query
            res.statusCode = 500;
            res.send({ msg: err });
            return res
        });
});

routes.get('/users/:id/sessions/:sessionId/car-status', (req, res) => {
    const id = req.params.id;
    const sessionID = req.params.sessionId;

    telemetryServer
        .queryPromise(`
            SELECT * 
            FROM car_status 
            WHERE session_id = '${sessionID}' AND user_id = '${id}'
            ORDER BY time
        `).then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
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
            ORDER BY time
        `)
        .then((rows) => {
            // all retrieved rows
            res.statusCode = 200;
            res.json(rows);
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