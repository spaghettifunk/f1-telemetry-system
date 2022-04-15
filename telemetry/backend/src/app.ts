import express from 'express';
import { Server } from 'socket.io';
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
    public server: express.Application;
    public socket: Server;

    private httpServerPort = 8081;
    private socketServerPort = 8082;
    private frontendURL = "http://localhost:3000";

    constructor() {
        this.server = express();
        this.server.set("port", this.httpServerPort);

        this.socket = new Server(this.socketServerPort, {
            cors: { origin: this.frontendURL },
        });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors({ origin: this.frontendURL }));
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    // used for querying Clickhouse and get past session's data
    public listenHttp() {
        this.server.listen(this.httpServerPort);
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
        });
    }
}

export default new App();