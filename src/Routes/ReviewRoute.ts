import Router from "express";
const RRoute = Router();
import { ReviewController } from "@Controllers";
const ReviewControllers = new ReviewController();
import { VerifyToken } from "../Middlewares/Verify.Middelware";
const Verify = new VerifyToken();

RRoute.post(
  "/review/Addreview/:Movid",
  Verify.verifyUser,
  ReviewControllers.Addreview
);
RRoute.get(
  "/review/getreview/:Movid",
  Verify.verifyForAll,
  ReviewControllers.Getreview
);

export default RRoute;
