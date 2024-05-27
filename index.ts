import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import config from "config";
import { Route } from "@Routes";

const app = express();
const PORT = config.get("PORT");

async function Start() {
  app.use(cookieParser());
  app.use(express.json());
  app.listen(PORT, () => {
    console.log("App running on this port ", PORT);
  });
  const MONGOURL: string = config.get("MONGOURL");

  if (MONGOURL) {
    await mongoose
      .connect(MONGOURL)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err: any) => {
        console.error("MongoDB Not COnnected");
      });
  }
  app.use(Route);
}
Start();
