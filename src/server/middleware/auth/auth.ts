import { type NextFunction, type Response } from "express";
import admin from "firebase-admin";
import CustomError from "../../../CustomError/CustomError.js";
import { firebaseApp } from "../../../firebase.js";
import { type CustomRequest } from "../../types.js";
import User from "../../../database/models/User.js";
import { type UserData, type UserStructure } from "../../../types.js";

const auth = async (req: CustomRequest, _res: Response, next: NextFunction) => {
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

    const userData: UserData = await admin
      .auth(firebaseApp)
      .verifyIdToken(token);

    const authId = userData.uid;
    const user = await User.findOne<UserStructure>({ authId });

    if (!user) {
      const newUserData = {
        name: userData.name,
        authId,
      };
      const newUser = await User.create(newUserData);
      req.userId = newUser._id;

      next();
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
