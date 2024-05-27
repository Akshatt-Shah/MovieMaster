import express, { Request, Response } from "express";
import { ReviewServices } from "@Services";
import { IRatingandReview } from "@interfaces";
import { NewRequest } from "../Middlewares/Verify.Middelware";
const ReviewService = new ReviewServices();

export class ReviewController {
  async Addreview(req: NewRequest, res: Response) {
    try {
      let data: IRatingandReview = req.body;
      data.userid = req.AdminId;
      data.movieid = req.params.Movid;
      const ReviewData = await ReviewService.Addreview(data);
      res.status(200).json(ReviewData);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async Getreview(req: NewRequest, res: Response) {
    try {
      const { Movid } = req.params;
      const ReviewData = await ReviewService.Getreview(Movid);
      res.status(200).json(ReviewData);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}
