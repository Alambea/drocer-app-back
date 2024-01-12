import mongoose from "mongoose";
import { type RecordStructure } from "../types.js";
import { userIdMock } from "./usersMock.js";

export const radioheadRecordIdMock: string =
  new mongoose.Types.ObjectId().toString();

export const fkaRecordIdMock: string = new mongoose.Types.ObjectId().toString();

export const fkaRecordMock: RecordStructure = {
  _id: fkaRecordIdMock,
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
};

export const radioheadRecordMock: RecordStructure = {
  _id: radioheadRecordIdMock,
  record: "In Rainbows",
  artist: "Radiohead",
  cover: "http://example.com/image.png",
  description:
    "In Rainbows is the seventh studio album by the English rock band Radiohead.",
  genres: "Art rock, alternative rock, experimental rock, art pop, electronica",
  label: "Self-released",
  length: "42:39",
  rating: 5,
  releaseDate: 2007,
  user: new mongoose.Types.ObjectId().toString(),
};

export const massiveRecordPostMock: Omit<RecordStructure, "_id" | "user"> = {
  record: "Mezzanine",
  artist: "Massive Attack",
  cover: "http://example.com/image.png",
  description:
    "Mezzanine is the third studio album by English electronic music group Massive Attack, released on 20 April 1998 by Circa and Virgin Records.",
  genres: "Trip-hop, electronica",
  label: "Virgin - Circa",
  length: "63:29",
  rating: 4,
  releaseDate: 1998,
};

export const portisheadRecordMock: RecordStructure = {
  _id: new mongoose.Types.ObjectId().toString(),
  record: "Third",
  artist: "Portishead",
  cover: "http://example.com/image.png",
  description:
    "Third is the third and most recent studio album by the English band Portishead",
  genres: "Experimental rock, electronica, psychedelic rock",
  label: "Island - Mercury",
  length: "49:17",
  rating: 4,
  releaseDate: 2008,
  user: userIdMock,
};

export const oceanRecordMock: RecordStructure = {
  _id: new mongoose.Types.ObjectId().toString(),
  record: "Heliocentric",
  artist: "The Ocean",
  cover: "http://example.com/image.png",
  description:
    "Heliocentric is the fourth studio album by German progressive metal band The Ocean",
  genres: "Post-metal, post-rock, sludge metal, progressive metal",
  label: "Pelagic, Metal Blade",
  length: "	50:58",
  rating: 2,
  releaseDate: 2010,
  user: userIdMock,
};

export const recordsMock: RecordStructure[] = [
  fkaRecordMock,
  radioheadRecordMock,
  portisheadRecordMock,
  oceanRecordMock,
  {
    ...massiveRecordPostMock,
    _id: new mongoose.Types.ObjectId().toString(),
    user: userIdMock,
  },
];
