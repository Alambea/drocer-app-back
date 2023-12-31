import mongoose from "mongoose";
import { type RecordStructure } from "../types.js";
import { userIdMock } from "./usersMock.js";

export const recordIdMock: string = new mongoose.Types.ObjectId().toString();

export const recordPostMock: Partial<RecordStructure> = {
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

export const expectedRecordIdMock: string =
  new mongoose.Types.ObjectId().toString();

export const recordsMock: RecordStructure[] = [
  {
    _id: expectedRecordIdMock,
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
    _id: recordIdMock,
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

export const expectedRecordMock: RecordStructure = {
  _id: expectedRecordIdMock,
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

export const modifiedRecordMock: RecordStructure = {
  _id: expectedRecordIdMock,
  record: "LP1",
  artist: "FKA Twigs",
  cover: "http://example.com/image.png",
  description: "New description here",
  genres: "Avant-pop, electronic, art pop R&B, trip hop, cool stuff",
  label: "Young Turks",
  length: "40:46",
  rating: 4,
  releaseDate: 2015,
  user: userIdMock,
};
