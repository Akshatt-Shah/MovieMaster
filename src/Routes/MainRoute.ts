import { Router } from "express";
import URoute from "./User.Route";
import GRoute from "./GenereRoute";
import MRoute from "./Movie.Route";
import RRoute from "./ReviewRoute";
import express from "express";
export const Route = Router();

Route.use(URoute);
Route.use(GRoute);
Route.use(MRoute);
Route.use(RRoute);
