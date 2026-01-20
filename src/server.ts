import express from "express";
import helmet from "helmet";
import { CorsConfig } from "./config/cors";
import { CustomErrorHandler } from "./middlewares/custom-error.middleware";

const app = express()

app.use(helmet())
CorsConfig(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
    res.json({
        service: 'worthit-backend',
        status: 'running',
        version: '2.1.0',
        features: {
        },
        endpoints: {
            health: '/api/health',
        }
    });
});

app.use(CustomErrorHandler)

export default app