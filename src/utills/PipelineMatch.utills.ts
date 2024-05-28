import mongoose from "mongoose";

export function Pipeline(AdminId?: string, Role?: string, Query?: any) {
  let Id = null;
  let MatchObject: any = {};
  let SearchObject: any = {};
  if (Query.Search) {
    SearchObject = {
      $or: [
        { "genereInfo.name": { $regex: Query.Search, $options: "i" } },
        { "castInfo.name": { $regex: Query.Search, $options: "i" } },
        { "DirectorInfo.name": { $regex: Query.Search, $options: "i" } },
        { "castInfo.name": { $regex: Query.Search, $options: "i" } },
        { "producerInfo.name": { $regex: Query.Search, $options: "i" } },
      ],
    };
  }
  if (Query.Producer) {
    SearchObject["producerInfo.name"] = { $regex: Query.Producer, $options: "i" };
  }
  if (Query.Director) {
    SearchObject["DirectorInfo.name"] = { $regex: Query.Director, $options: "i" };
  }
  if (Query.Actor) {
    SearchObject["castInfo.name"] = { $regex: Query.Actor, $options: "i" };
  }
  if (Query.StartBudget) {
    SearchObject["Budget"] = { $gte: Number(Query.StartBudget) };
  }
  if (Query.EndBudget) {
    SearchObject["Budget"] = {
      ...SearchObject["Budget"],
      $lte: Number(Query.EndBudget),
    };
  }
  if (Query.StartDate) {
    let sDate = new Date(Query.StartDate).toISOString();
    SearchObject["releasedata"] = { $gte: new Date(sDate) };
  }
  if (Query.EndDate) {
    let sDate = new Date(Query.EndDate).toISOString();
    SearchObject["releasedata"] = {
      ...SearchObject["releasedata"],
      $lte: new Date(sDate),
    };
  }
  console.log(SearchObject);
  if (AdminId) {
    Id = new mongoose.Types.ObjectId(AdminId);
  }
  if (Role === "Actor") {
    MatchObject["cast"] = Id;
  }
  if (Role === "Producer") {
    MatchObject["producer"] = Id;
  }
  if (Role === "Director") {
    MatchObject["director"] = Id;
  }
  if (Role === "User" || Role === "Admin") {
    MatchObject;
  }
  console.log(MatchObject);
  console.log(SearchObject);
  return { MatchObject, SearchObject };
}
