import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import routes from './routes';

class App {
    public server: express.Application;
    public socket: Server;

    constructor() {
        this.server = express();
        this.server.set("port", 8081);

        this.socket = new Server(8082, {
            cors: {
                origin: "http://localhost:3000"
            }
        });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        const allowedOrigins = ['http://localhost:3000']; // frontend
        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        this.server.use(cors(options));
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App();