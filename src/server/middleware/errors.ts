import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

const debug = debugCreator("records:server:errors");

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const customError = new CustomError(
    "Endpoint not found",
    404,
    "Endpoint not found",
  );

  next(customError);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  debug(chalk.red(`Error${error.privateMessage}`));

  const errorMessage = error.message ?? "Internal server error";
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({ error: errorMessage });
};
