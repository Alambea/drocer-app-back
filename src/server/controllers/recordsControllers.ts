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

export const deleteByIdController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await Record.findByIdAndDelete(id).exec();

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Failed to delete record",
    );

    next(customError);
  }
};
