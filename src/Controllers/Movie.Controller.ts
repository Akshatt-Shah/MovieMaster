import express, { Request, Response } from "express";
import { IMovie } from "@interfaces";
import { MovieServices } from "@Services";
import { NewRequest } from "../Middlewares/Verify.Middelware";
import mongoose, { mongo } from "mongoose";
const MovieService = new MovieServices();

export class MovieController {
  async CreateMovies(req: Request, res: Response) {
    try {
      const Data: IMovie = req.body;
      const MovieData = await MovieService.CreateMovie(Data);
      res.status(200).json(MovieData);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async GetMovies(req: NewRequest, res: Response) {
    try {
      const { AdminId, Role } = req;
      const Query:any = req.query;
      const MovieData = await MovieService.GetMovie(AdminId,Role,Query );
      res.status(200).json(MovieData);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async DeleteMovies(req: Request, res: Response) {
    try {
      const { Id } = req.params;
      const MovieData = await MovieService.DeleteMovie(Id);
      res.status(200).json(MovieData);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async UpdateMovies(req: Request, res: Response) {
    try {
      const { Id } = req.params;
      const data: IMovie = req.body;
      const MovieData = await MovieService.UpdateMovie(Id, data);
      res.status(200).json(MovieData);
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}
