import { IMovie } from "@interfaces";
import { movies, users } from "@Models";
import mongoose from "mongoose";
import { Pipeline } from "../utills/PipelineMatch.utills";

export class MovieServices {
  async CreateMovie(data: IMovie) {
    try {
      const MovieData = await movies.create(data);
      return {
        message: "Movie Created Successfully",
        Data: MovieData,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetMovie(AdminId?: string, Role?: string, Query?: any) {
    try {
      // let Id = null;
      // let MatchObject: any = {};
      // let SearchObject: any = {};
      // if (Query.Search) {
      //   SearchObject = {
      //     $or: [
      //       { "genereInfo.name": { $regex: Query.Search, $options: "i" } },
      //       { "castInfo.name": { $regex: Query.Search, $options: "i" } },
      //       { "DirectorInfo.name": { $regex: Query.Search, $options: "i" } },
      //       { "castInfo.name": { $regex: Query.Search, $options: "i" } },
      //       { "producerInfo.name": { $regex: Query.Search, $options: "i" } },
      //     ],
      //   };
      // }
      // if (Query.StartBudget) {
      //   SearchObject["Budget"] = { $gte: Number(Query.StartBudget) };
      // }
      // if (Query.EndBudget) {
      //   SearchObject["Budget"] = {
      //     ...SearchObject["Budget"],
      //     $lte: Number(Query.EndBudget),
      //   };
      // }
      // if (Query.StartDate) {
      //   let sDate = new Date(Query.StartDate).toISOString();
      //   SearchObject["releasedata"] = { $gte: new Date(sDate) };
      // }
      // if (Query.EndDate) {
      //   let sDate = new Date(Query.EndDate).toISOString();
      //   SearchObject["releasedata"] = {
      //     ...SearchObject["releasedata"],
      //     $lte: new Date(sDate),
      //   };
      // }
      // console.log(SearchObject);
      // if (AdminId) {
      //   Id = new mongoose.Types.ObjectId(AdminId);
      // }
      // if (Role === "Actor") {
      //   MatchObject["cast"] = Id;
      // }
      // if (Role === "Producer") {
      //   MatchObject["producer"] = Id;
      // }
      // if (Role === "Director") {
      //   MatchObject["director"] = Id;
      // }
      // if (Role === "User" || Role === "Admin") {
      //   MatchObject;
      // }
      // console.log(MatchObject);
      const Data = Pipeline(AdminId, Role, Query);
      // const MovieData = await movies.find();
      
      const MovieData = await movies.aggregate([
        {
          $match: Data.MatchObject,
        },
        {
          $lookup: {
            from: "generes",
            localField: "genere",
            foreignField: "_id",
            as: "genereInfo",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "cast",
            foreignField: "_id",
            as: "castInfo",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "producer",
            foreignField: "_id",
            as: "producerInfo",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "director",
            foreignField: "_id",
            as: "DirectorInfo",
          },
        },
        { $match: Data.SearchObject },
        {
          $addFields: {
            SuccessLevel: {
              $subtract: [
                {
                  $divide: [
                    {
                      $multiply: [
                        {
                          $sum: "$collections",
                        },
                        100,
                      ],
                    },
                    "$Budget",
                  ],
                },
                100,
              ],
            },
          },
        },
        {
          $addFields: {
            Status: {
              $cond: {
                if: {
                  $gte: ["$SuccessLevel", 300],
                },
                then: "BlockBuster",
                else: {
                  $cond: {
                    if: {
                      $gte: ["$SuccessLevel", 200],
                    },
                    then: "Super-Hit",
                    else: {
                      $cond: {
                        if: {
                          $gte: ["$SuccessLevel", 100],
                        },
                        then: "Hit",
                        else: "Flop",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        {
          $project: {
            title: 1,
            SuccessLevel: {
              $concat: [{ $toString: "$SuccessLevel" }, "%"],
            },
            Status: 1,
            releasedata: 1,
            Budget: 1,
            collections: 1,
            Director: {
              $first: ["$DirectorInfo.name"],
            },
            Actor: {
              $map: {
                input: "$castInfo",
                as: "actor",
                in: "$$actor.name",
              },
            },
            Producer: {
              $map: {
                input: "$producerInfo",
                as: "producer",
                in: "$$producer.name",
              },
            },
            Genere: {
              $map: {
                input: "$genereInfo",
                as: "genere",
                in: "$$genere.name",
              },
            },
          },
        },
      ]);
      return {
        Data: MovieData,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteMovie(Id: string) {
    try {
      const MovieData = await movies.findByIdAndDelete(Id);
      return {
        message: "Movie Deleted Successfully",
        Data: MovieData,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async UpdateMovie(Id: string, data: IMovie) {
    try {
      const MovieData = await movies.findByIdAndUpdate(Id, data);
      return {
        message: "Movie Updated Successfully",
        Data: MovieData,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
