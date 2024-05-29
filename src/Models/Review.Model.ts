import mongoose, { Schema } from "mongoose";
import { IRatingandReview } from "@interfaces";
import { movies } from "./Movie.Model";
import { users } from "./User.Model";

const RartingandreviewSchema: Schema = new Schema(
  {
    movieid: { type: mongoose.Schema.ObjectId, ref: movies, required: true },
    userid: { type: mongoose.Schema.ObjectId, ref: users, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    review: { type: String },
  },
  {
    timestamps: true,
  }
);

export const rating = mongoose.model<IRatingandReview>(
  "ratings",
  RartingandreviewSchema
);
