import mongoose from "mongoose";
import { type RecordStructure } from "../types.js";
import { userIdMock } from "./usersMock.js";

export const recordToDeleteIdMock: string =
  new mongoose.Types.ObjectId().toString();
export const recordsMock: RecordStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    record: "LP1",
    artist: "FKA Twigs",
    cover: "http://example.com/image.png",
    description: "August",
    genres: "Avant-pop, electronic, art pop R&B, trip hop",
    label: "Young Turks",
    length: "40:46",
    rating: 4,
    releaseDate: 2014,
    user: userIdMock,
  },
  {
    _id: recordToDeleteIdMock,
    record: "In Rainbows",
    artist: "Radiohead",
    cover: "http://example.com/image.png",
    description:
      "In Rainbows is the seventh studio album by the English rock band Radiohead.",
    genres:
      "Art rock, alternative rock, experimental rock, art pop, electronica",
    label: "Self-released",
    length: "42:39",
    rating: 5,
    releaseDate: 2007,
    user: new mongoose.Types.ObjectId().toString(),
  },
];
