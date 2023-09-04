import { type Schema } from "mongoose";

export interface RecordStructure {
  id: string;
  record: string;
  artist: string;
  releaseDate: number;
  rating: number;
  description: string;
  length: string;
  label: string;
  genres: string;
  cover: string;
  user: string;
}

export interface UserStructure {
  id: Schema.Types.ObjectId;
  authId: string;
  name: string;
}
