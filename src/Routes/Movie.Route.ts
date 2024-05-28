import { Router } from "express";
import { MovieController } from "@Controllers";
const MovieControllers = new MovieController();
import { VerifyToken } from "../Middlewares/Verify.Middelware";
const Verify = new VerifyToken();
const MRoute = Router();

MRoute.post(
  "/Movie/CreateMovie",
  Verify.verifyAdmin,
  MovieControllers.CreateMovies
);

MRoute.get("/Movie/GetMovie", Verify.verifyForAll, MovieControllers.GetMovies);

MRoute.delete(
  "/Movie/DeleteMovie/:Id",
  Verify.verifyAdmin,
  MovieControllers.DeleteMovies
);

MRoute.put(
  "/Movie/UpdateMovie/:Id",
  Verify.verifyAdmin,
  MovieControllers.UpdateMovies
);
MRoute.get(
  "/Movie/PDFMovie/:Id",
  Verify.verifyAdmin,
  MovieControllers.PdfMovies
);

export default MRoute;
