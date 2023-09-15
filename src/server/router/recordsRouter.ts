import express from "express";
import { paths } from "../paths/paths.js";
import {
  addRecordController,
  deleteByIdController,
  getRecordByIdController,
  getRecordsController,
} from "../controllers/recordsControllers.js";

const recordsRouter = express.Router();

recordsRouter.get(paths.root, getRecordsController);
recordsRouter.delete(`${paths.root}:id`, deleteByIdController);
recordsRouter.post(`${paths.root}`, addRecordController);
recordsRouter.get(`${paths.root}:id`, getRecordByIdController);

export default recordsRouter;
