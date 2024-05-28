import express, { Request, Response } from "express";
import { IMovie } from "@interfaces";
import { MovieServices } from "@Services";
import { NewRequest } from "../Middlewares/Verify.Middelware";
import mongoose, { mongo } from "mongoose";
const pdf = require("html-pdf");
const fs = require("fs");
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
      const Query: any = req.query;
      const MovieData = await MovieService.GetMovie(AdminId, Role, Query);
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
  async PdfMovies(req: Request, res: Response) {
    try {
      const { Id } = req.params;
      const data: IMovie = req.body;
      const MovieData = await MovieService.PdfMovie(Id);
      const HTML = ` <h2>Movie Data Table</h2>
      <table border="2">
          <tr>
              <th>Field</th>
              <th>Value</th>
          </tr>
          <tr>
              <td>_id</td>
              <td>${MovieData.Data?._id}</td>
          </tr>
          <tr>
              <td>Title</td>
              <td>${MovieData.Data?.title}</td>
          </tr>
          <tr>
              <td>Release Date</td>
              <td>${MovieData.Data?.releasedata}</td>
          </tr>
          <tr>
              <td>Genre</td>
              <td>
                  <ul>
                      <li>${MovieData.Data?.genere[0]}</li>
                      <li>${MovieData.Data?.genere[1]}</li>
                  </ul>
              </td>
          </tr>
          <tr>
              <td>Cast</td>
              <td>
                  <ul>
                      <li>${MovieData.Data?.cast}</li>
                  </ul>
              </td>
          </tr>
          <tr>
              <td>Producer</td>
              <td>
                  <ul>
                      <li>${MovieData.Data?.producer}</li>
                  </ul>
              </td>
          </tr>
          <tr>
              <td>Director</td>
              <td>${MovieData.Data?.director}</td>
          </tr>
          <tr>
              <td>Budget</td>
              <td>${MovieData.Data?.Budget}</td>
          </tr>
          <tr>
              <td>Collections</td>
              <td>${MovieData.Data?.collections}</td>
          </tr>
          <tr>
              <td>__v</td>
              <td>${MovieData.Data?.__v}</td>
          </tr>
      </table>`;
      // const pdfdata = await pdf
      //   .create(HTML)
      //   .toFile("pdf/output.pdf", (err: any, res: any) => {
      //     if (err) return console.log(err);
      //     console.log(res); // { filename: '/app/output.pdf' }
      //     return res;
      //   });
      // res.status(200).send({ message: "PDF Generated" });
      pdf.create(HTML).toStream((err: any, stream: any) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Error generating PDF", error: err });
        }
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=movie.pdf");
        stream.pipe(res);
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}
