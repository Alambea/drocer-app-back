import express from "express";
import { paths } from "../paths/paths.js";
import {
  deleteByIdController,
  getRecordsController,
} from "../controllers/recordsControllers.js";

const recordsRouter = express.Router();

recordsRouter.get(paths.slash, getRecordsController);
recordsRouter.delete(`${paths.slash}:id`, deleteByIdController);

export default recordsRouter;
