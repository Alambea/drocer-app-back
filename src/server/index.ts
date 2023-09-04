import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController.js";
import { endPointNotFound, generalErrorHandler } from "./middleware/errors.js";

const corsOptions = {
  origin: process.env.ALLOW_ORIGIN_PROD,
  methods: "",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.get("/", pingController);

app.use(endPointNotFound);

app.use(generalErrorHandler);

export default app;
