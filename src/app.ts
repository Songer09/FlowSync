import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import workflowRoutes from "./routes/workflow.routes";
import triggerRoutes from './routes/trigger.routes'
import actionRoutes from './routes/action.routes'
import executionRoutes from './routes/execution.routes'
import swaggerUi from 'swagger-ui-express';
import { specs } from './utils/swagger';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(helmet());
    this.app.use(cors());
  }

  private configureRoutes(): void {
    this.app.get("/", (req, res) => {
      res.json({ message: "FlowSync API - Backend listo." });
    });
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/workflows", workflowRoutes);
    this.app.use("/api/workflows", triggerRoutes);
    this.app.use("/api/workflows", actionRoutes);
    this.app.use('/api/workflows', executionRoutes);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  public getApp(): express.Application {
    return this.app;
  }
}
