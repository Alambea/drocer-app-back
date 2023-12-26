import express from "express";
import { paths } from "../paths/paths.js";
import {
  addRecordController,
  deleteByIdController,
  getRecordByIdController,
  getRecordsController,
  modifyRecordController,
} from "../controllers/recordsControllers.js";

const recordsRouter = express.Router();

recordsRouter.get(paths.root, getRecordsController);
recordsRouter.delete(`${paths.root}:id`, deleteByIdController);
recordsRouter.post(`${paths.root}`, addRecordController);
recordsRouter.get(`${paths.root}:id`, getRecordByIdController);
recordsRouter.patch(`${paths.root}:id`, modifyRecordController);
recordsRouter.put(`${paths.root}:id`, modifyRecordController);

export default recordsRouter;
