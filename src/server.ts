import express from "express";
import helmet from "helmet";
import { CorsConfig } from "./config/cors.js";
import { CustomErrorHandler } from "./middlewares/custom-error.middleware.js";
import { healthRouter } from "./routes/health.route.js";
import { userRouter } from "./routes/user.route.js";
import { authRouter } from "./routes/auth.route.js";
import { brandRouter } from "./routes/brand.route.js";
import { reviewRouter } from "./routes/review.route.js";

const app = express()

app.use(helmet())
CorsConfig(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/health", healthRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/brand", brandRouter);
app.use("/api/review", reviewRouter);

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