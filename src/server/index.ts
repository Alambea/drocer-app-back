import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController.js";
import { endpointNotFound, generalError } from "./middleware/errors/errors.js";
import { paths } from "./paths/paths.js";
import auth from "./middleware/auth/auth.js";
import recordsRouter from "./router/recordsRouter.js";

const corsOptions = {
  origin: process.env.ALLOW_ORIGIN_PROD!,
};

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.get(paths.slash, pingController);

app.use(auth);

app.use(paths.getRecords, recordsRouter);

app.use(endpointNotFound);

app.use(generalError);

export default app;
