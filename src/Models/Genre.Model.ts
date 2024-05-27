import mongoose, { Schema } from "mongoose";
import { IGenre } from "@interfaces";

const GenreSchema: Schema = new Schema({
  name: {
    type: String,
    enum: {
      values: [
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Film-Noir",
        "History",
        "Horror",
        "Music",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Short",
        "Sport",
        "Thriller",
        "War",
        "Western",
      ],
      message: "${VALUE} id not a valid Genere name!!!!!!!!!!!",
    },
    required: true,
  },
});

export const generes = mongoose.model<IGenre>("generes", GenreSchema);
