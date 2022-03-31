import express from 'express';
import cors from 'cors';
import routes from './routes';

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        const allowedOrigins = ['http://localhost:3000'];
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

export default new App().server;