import express from "express";
import { paths } from "../paths/paths.js";
import {
  addRecordController,
  deleteByIdController,
  getRecordsController,
} from "../controllers/recordsControllers.js";

const recordsRouter = express.Router();

recordsRouter.get(paths.root, getRecordsController);
recordsRouter.delete(`${paths.root}:id`, deleteByIdController);
recordsRouter.post(`${paths.root}`, addRecordController);

export default recordsRouter;
