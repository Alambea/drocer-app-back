import cors from "cors";
import express from "express";
import morgan from "morgan";
import { endPointNotFound, generalErrorHandler } from "./middleware/errors.js";

const corsOptions = {
  origin: [
    "https://ana-lambea-final-project-20230.netlify.app/",
    "http://localhost:4005",
  ],
  methods: "",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.use(endPointNotFound);
app.use(generalErrorHandler);

export default app;
