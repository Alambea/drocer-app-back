import { type NextFunction, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import admin from "firebase-admin";
import { firebaseApp } from "../../../firebase.js";
import { type AuthRequest } from "../../types.js";
import User from "../../../database/models/User.js";
import { type UserStructure } from "../../../types.js";

const auth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const customError = new CustomError(
        "Token not provided",
        401,
        "Unauthorized",
      );

      next(customError);
      return;
    }

    const userData = await admin.auth(firebaseApp).verifyIdToken(token);
    const authId = userData.uid;
    const user = await User.findOne<UserStructure>({ authId });

    if (!user) {
      const customError = new CustomError(
        "User not found",
        401,
        "User not found",
      );
      next(customError);
      return;
    }

    req.userId = user._id;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      401,
      "Invalid Token",
    );

    next(customError);
  }
};

export default auth;
