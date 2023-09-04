import mongoose from "mongoose";
import { type RecordStructure } from "../types.js";

export const recordsMock: RecordStructure[] = [
  {
    id: new mongoose.Types.ObjectId().toString(),
    record: "LP1",
    artist: "FKA twigs",
    releaseDate: 2014,
    rating: 4,
    description: "",
    length: "",
    label: "",
    genres: "",
    cover: "",
    user: new mongoose.Types.ObjectId().toString(),
  },
  {
    id: new mongoose.Types.ObjectId().toString(),
    record: "ISON",
    artist: "Sevdaliza",
    releaseDate: 2017,
    rating: 4,
    description: "",
    length: "",
    label: "",
    genres: "",
    cover: "",
    user: new mongoose.Types.ObjectId().toString(),
  },
];
