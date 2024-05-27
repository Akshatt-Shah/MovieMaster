import { IMovie } from "@interfaces";
import mongoose, { Schema } from "mongoose";
import { generes } from "./Genre.Model";
import { users } from "./User.Model";

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  releasedata: { type: Date, required: true },
  genere: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: generes,
      required: true,
    },
  ],
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: users,
      required: true,
    },
  ],
  producer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: users,
      required: true,
    },
  ],
  director: { type: mongoose.Schema.ObjectId, ref: users, required: true },
  Budget: { type: Number, required: true },
  collections: { type: Number, default: 0 },
});

export const movies = mongoose.model<IMovie>("movies", MovieSchema);
