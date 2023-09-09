import type mongoose from "mongoose";

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
  id: mongoose.Types.ObjectId;
  authId: string;
  name: string;
}

export interface MongooseUserStructure {
  _id: mongoose.Types.ObjectId;
  authId: string;
  name: string;
}
