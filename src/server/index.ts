import cors from "cors";
import express from "express";
import morgan from "morgan";

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

export default app;
