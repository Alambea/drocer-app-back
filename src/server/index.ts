import "dotenv/config";
import cors, { type CorsOptions } from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController.js";
import { endpointNotFound, generalError } from "./middleware/errors/errors.js";
import { paths } from "./paths/paths.js";
import auth from "./middleware/auth/auth.js";
import recordsRouter from "./router/recordsRouter.js";

const corsOptions: CorsOptions = {
  origin: [process.env.ALLOW_ORIGIN_PROD!, process.env.ALLOW_ORIGIN_LOCAL!],
};

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.get(paths.root, pingController);

app.use(auth);

app.use(paths.records, recordsRouter);

app.use(endpointNotFound);

app.use(generalError);

export default app;
