import { UserServices } from "@Services";
import express, { Request, Response } from "express";
import { IUser } from "@interfaces";
import { SuccessStatus, ErrorStatus } from "../Errors/Statuscode";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "@Models";
import { NewRequest } from "../Middlewares/Verify.Middelware";
const UserService = new UserServices();

export class UserController {
  async CreateUser(req: Request, res: Response) {
    try {
      let data: IUser = req.body;
      data.password = await bcrypt.hash(data.password, 10);
      const Userdata = await UserService.CreateUser(data);
      res.status(SuccessStatus.created).json(Userdata);
    } catch (error: any) {
      res
        .status(ErrorStatus.internalServerError)
        .json({ message: error.message });
    }
  }
  async GetUser(req: NewRequest, res: Response) {
    try {
      const UserId: any = req.AdminId;
      const Userdata = await UserService.GetUser(UserId);
      res.status(SuccessStatus.created).json(Userdata);
    } catch (error: any) {
      res
        .status(ErrorStatus.internalServerError)
        .json({ message: error.message });
    }
  }
  async GetAllUser(req: Request, res: Response) {
    try {
      const { role }:any = req.query;
      const Userdata = await UserService.GetAllUser(role);
      res.status(SuccessStatus.created).json(Userdata);
    } catch (error: any) {
      res
        .status(ErrorStatus.internalServerError)
        .json({ message: error.message });
    }
  }
  async LoginUser(req: Request, res: Response) {
    try {
      let { email, password } = req.body as { email: string; password: string };
      const userdata = await UserService.LoginUser(email, password);
      if (userdata.token) {
        res.cookie("LoginToken", userdata.token);
      }
      res.status(200).json({ message: userdata });
    } catch (error: any) {
      res
        .status(ErrorStatus.internalServerError)
        .json({ message: error.message });
    }
  }
  async UpdateUser(req: NewRequest, res: Response) {
    try {
      let data: IUser = req.body;
      const userid: any = req.AdminId;
      data.password = await bcrypt.hash(data.password, 10);
      const Userdata = await UserService.UpdateUser(userid, data);
      res.status(SuccessStatus.created).json(Userdata);
    } catch (error: any) {
      res
        .status(ErrorStatus.internalServerError)
        .json({ message: error.message });
    }
  }
  async DeleteUser(req: NewRequest, res: Response) {
    try {
      const userid: any = req.AdminId;
      const Userdata = await UserService.DeleteUser(userid);
      res.status(SuccessStatus.created).json(Userdata);
    } catch (error: any) {
      res
        .status(ErrorStatus.internalServerError)
        .json({ message: error.message });
    }
  }
  async DeleteUserByAdmin(req: NewRequest, res: Response) {
    try {
      const { userid }: any = req.params;
      const Userdata = await UserService.DeleteUser(userid);
      res.status(SuccessStatus.created).json(Userdata);
    } catch (error: any) {
      res
        .status(ErrorStatus.internalServerError)
        .json({ message: error.message });
    }
  }
}
