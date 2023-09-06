import { Schema, model } from "mongoose";
import { type RecordStructure } from "../../types.js";
import User from "./User.js";

const recordSchema = new Schema<RecordStructure>({
  record: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Record = model("Record", recordSchema, "records");

export default Record;
