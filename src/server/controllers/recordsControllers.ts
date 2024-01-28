import { type NextFunction, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Record from "../../database/models/Record.js";
import { type CustomRequest } from "../types.js";
import { type FilterQuery } from "mongoose";
import { type RecordStructure } from "../../types.js";

export const getRecordsController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { limit, offset, query } = req.query;

  const filterOptions: FilterQuery<RecordStructure> = {
    user: req.userId,
  };

  if (query) {
    filterOptions.$or = [
      { artist: { $regex: query, $options: "i" } },
      { record: { $regex: query, $options: "i" } },
    ];
  }

  try {
    const records = await Record.find(filterOptions, null, {
      sort: { _id: -1 },
    })
      .select("-__v")
      .limit(+limit)
      .skip(+offset)
      .exec();

    const count = await Record.find(filterOptions).count();

    res.status(200).json({ count, records });
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
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
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

export const addRecordController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const record = req.body;
  const { userId } = req;

  try {
    const newRecord = await Record.create({ ...record, user: userId });

    res.status(201).json({ record: newRecord });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Can't create the record",
    );

    next(customError);
  }
};

export const getRecordByIdController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const record = await Record.findById(id).select("-__v");

    res.status(200).json({ record });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Failed to retrieve record",
    );

    next(customError);
  }
};

export const modifyRecordController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const newRecordData = req.body;

  try {
    const updatedRecord = await Record.findByIdAndUpdate(id, newRecordData, {
      returnDocument: "after",
    })
      .select("-__v")
      .exec();

    res.status(200).json({ record: updatedRecord });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      304,
      "Failed to modify record",
    );

    next(customError);
  }
};
