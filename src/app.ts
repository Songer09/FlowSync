import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

export class App{
    public app: express.Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware(): void {
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(helmet());
        this.app.use(cors());
    }

    private configureRoutes(): void {
        this.app.get('/', (req, res) => {
            res.json({ message: 'FlowSync API - Backend listo.' });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}