import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler";
import routeHandler from "./middleware/routeHandler";
import taskRouter from "./routes/route";
dotenv.config();
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const isDevelopment = process.env.NODE_ENV === "development";

const corsOptions = {
  origin: isDevelopment
    ? "http://localhost:3000"
    : process.env.PRODUCTION_CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/tasks", taskRouter);

app.use("*", routeHandler);
app.use(errorHandler);

export default app;
