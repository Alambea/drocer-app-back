import { type Request } from "express";
import type mongoose from "mongoose";

export interface AuthRequest extends Request {
  userId: mongoose.Types.ObjectId;
}
