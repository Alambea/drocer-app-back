import "dotenv/config";

import chalk from "chalk";
import debugCreator from "debug";
import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../CustomError/CustomError";

const debug = debugCreator("records:server:errors");

export const generalErrorHandler = (
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
