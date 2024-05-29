import mongoose, { Schema } from "mongoose";
import { IUser } from "@interfaces";

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    DOB: { type: Date, required: true },
    Age: { type: Number, required: true },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is Not A Valid Gender",
      },
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["Admin", "Producer", "Actor", "Director", "User"],
        message: "{VALUE} is Not A Valid role",
      },
      required: true,
    },
    otp: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const users = mongoose.model<IUser>("users", UserSchema);
