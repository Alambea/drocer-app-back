import cors from "cors";
import express from "express";

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

app.use(cors(corsOptions));

export default app;
