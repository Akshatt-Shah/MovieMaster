import { Router } from "express";
import { GenereController } from "@Controllers";
const GenereControllers = new GenereController();
import { VerifyToken } from "../Middlewares/Verify.Middelware";
const Verify = new VerifyToken();
const GRoute = Router();

GRoute.post(
  "/genere/CreateGenere",
  Verify.verifyAdmin,
  GenereControllers.CreateGenere
);

GRoute.get(
  "/genere/GetGenere",
  Verify.verifyForAll,
  GenereControllers.GetGenere
);

GRoute.delete(
  "/genere/DeleteGenere/:Id",
  Verify.verifyAdmin,
  GenereControllers.DeleteGenere
);

export default GRoute;
