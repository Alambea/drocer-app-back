import { type NextFunction, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Record from "../../database/models/Record.js";
import { type AuthRequest } from "../types.js";

export const getRecordsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const records = await Record.find({ user: req.userId }).limit(10).exec();

    res.status(200).json({ records });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Can't retrieve records",
    );
    next(customError);
  }
};
