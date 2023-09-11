import mongoose from "mongoose";
import { type MongooseUserStructure } from "../types";

export const userIdMock: string = new mongoose.Types.ObjectId().toString();
export const authIdMock = "authIdExample";

export const userMock: MongooseUserStructure = {
  _id: userIdMock,
  authId: authIdMock,
  name: "Claudia",
};
