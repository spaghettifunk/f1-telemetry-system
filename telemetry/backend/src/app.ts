import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";

import cors from 'cors';
import routes from './routes';
import {
    consumeParticipants,
    consumeWeather,
    consumeFastestLap,
    consumeTeammatePit,
    consumeRaceWinner,
    consumePenalty,
    consumeSpeedTrap,
    consumeStopGoServed,
    consumeDriveThroughServed,
    consumeRetirement,
    consumeCarTelemetry,
    consumeLap,
    consumeCarStatus,
    consumeMotionData
} from './live';

class App {
    private app: express.Application;
    private httpServer: http.Server;
    private socket: socketio.Server;

    private httpServerPort = 8082;
    // private socketServerPort = 8082;
    private frontendURL = "http://localhost:3000";

    constructor() {
        this.app = express.default();
        this.httpServer = http.createServer(this.app);

        this.socket = new socketio.Server(this.httpServer, {
            cors: { origin: this.frontendURL },
        });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors({ origin: this.frontendURL }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(routes);
    }

    // used for querying Clickhouse and get past session's data
    public listenHttp() {
        this.httpServer.listen(this.httpServerPort);
    }

    // used for real-time telemetry data
    public listenSocket() {
        this.socket.on("connection", function (socket: any) {
            console.log("a user connected...");

            consumeParticipants(socket);
            consumeWeather(socket);
            consumeFastestLap(socket);
            consumeTeammatePit(socket);
            consumeRaceWinner(socket);
            consumePenalty(socket);
            consumeSpeedTrap(socket);
            consumeStopGoServed(socket);
            consumeDriveThroughServed(socket);
            consumeRetirement(socket);
            consumeCarTelemetry(socket);
            consumeLap(socket);
            consumeCarStatus(socket);
            consumeMotionData(socket);

            //Whenever someone disconnects this piece of code executed
            socket.on('disconnect', function () {
                console.log('A user disconnected');
            });
        });
    }
}

export default new App();