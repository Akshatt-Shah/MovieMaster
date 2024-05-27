import { IGenre } from "@interfaces";
import { GenereServices } from "@Services";
import express, { Request, Response } from "express";
const GenereService = new GenereServices();

export class GenereController {
  async CreateGenere(req: Request, res: Response) {
    try {
      const Data: IGenre = req.body;
      const GenereData = await GenereService.CreateGenere(Data);
      res.status(200).json(GenereData);
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async GetGenere(req: Request, res: Response) {
    try {
      const GenereData = await GenereService.GetGenere();
      res.status(200).json(GenereData);
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async DeleteGenere(req: Request, res: Response) {
    try {
      const { Id } = req.params;
      const GenereData = await GenereService.DeleteGenere(Id);
      res.status(200).json(GenereData);
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
}
