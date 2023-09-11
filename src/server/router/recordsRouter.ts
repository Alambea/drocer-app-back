import express from "express";
import { paths } from "../paths/paths.js";
import { getRecordsController } from "../controllers/recordsControllers.js";

const recordsRouter = express.Router();

recordsRouter.get(paths.slash, getRecordsController);

export default recordsRouter;
