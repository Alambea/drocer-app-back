import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Record from "../../database/models/Record.js";

export const getRecordsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const records = await Record.find().limit(10).exec();

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
