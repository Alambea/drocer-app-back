import { Schema, model } from "mongoose";
import { type UserStructure } from "../../types.js";

const UserSchema = new Schema<UserStructure>({
  authId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema, "users");

export default User;
