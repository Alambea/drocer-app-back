import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";
import Record from "../../database/models/Record";

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
      "Can't retrieve records",
      404,
      (error as Error).message,
    );
    next(customError);
  }
};
