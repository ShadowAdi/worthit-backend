import express from "express";
import helmet from "helmet";
import { CorsConfig } from "./config/cors";
import { CustomErrorHandler } from "./middlewares/custom-error.middleware";
import { healthRouter } from "./routes/health.route";
import { userRouter } from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
import { brandRouter } from "./routes/brand.route";

const app = express()

app.use(helmet())
CorsConfig(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/health", healthRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/brand", brandRouter);

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