import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController.js";
import { endpointNotFound, generalError } from "./middleware/errors.js";
import { paths } from "./paths/paths.js";

const corsOptions = {
  origin: process.env.ALLOW_ORIGIN_PROD!,
};

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.get(paths.ping, pingController);

app.use(endpointNotFound);

app.use(generalError);

export default app;
