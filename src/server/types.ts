import { type Request } from "express";
import { type RecordStructure } from "../types";

export interface AuthRequest
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Partial<Omit<RecordStructure, "_id" | "user">>
  > {
  userId?: string;
}
