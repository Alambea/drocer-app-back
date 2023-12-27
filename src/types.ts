import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export interface RecordStructure {
  _id: string;
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
  _id: string;
  authId: string;
  name: string;
}

export interface MongooseUserStructure {
  _id: string;
  authId: string;
  name: string;
}

export interface UserData extends Partial<DecodedIdToken> {
  name?: string;
}
