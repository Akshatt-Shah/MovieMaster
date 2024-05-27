import Jwt, { JwtPayload } from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import { users } from "@Models";

export interface NewRequest extends Request {
  AdminId?: string;
  Role?: string;
}
interface JWTBODY extends JwtPayload {
  UserToken: string;
}

export class VerifyToken {
  async verifyAdmin(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const LoginToken = req.cookies.LoginToken;
      if (LoginToken) {
        const token: any = Jwt.verify(LoginToken, "AKSHAT");
        console.log(token);
        if (token && token.UserRole === "Admin") {
          req.AdminId = token.UserToken;
          req.Role = token.UserRole;
          next();
        } else {
          res.status(401).json({
            message: "SecretKey Does Not Match or It Is Not A Admin",
            status: false,
          });
        }
      } else {
        res.status(401).json({
          message:
            "UnAuthorized Access Please Login With Admin Account!!!!!!!!!",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(401).json({ message: error.message, status: false });
    }
  }
  async verifyUser(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const LoginToken = req.cookies.LoginToken;
      if (LoginToken) {
        const token: any = Jwt.verify(LoginToken, "AKSHAT");
        console.log(token);
        if (token && token.UserRole === "User") {
          req.AdminId = token.UserToken;
          req.Role = token.UserRole;
          next();
        } else {
          res.status(401).json({
            message: "SecretKey Does Not Match or It Is Not A User",
            status: false,
          });
        }
      } else {
        res.status(401).json({
          message:
            "UnAuthorized Access Please Login With User Account!!!!!!!!!",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(401).json({ message: error.message, status: false });
    }
  }
  async verifyproducer(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const LoginToken = req.cookies.LoginToken;
      if (LoginToken) {
        const token: any = Jwt.verify(LoginToken, "AKSHAT");
        console.log(token);
        if (token && token.UserRole === "Producer") {
          req.AdminId = token.UserToken;
          req.Role = token.UserRole;
          next();
        } else {
          res.status(401).json({
            message: "SecretKey Does Not Match or It Is Not A Producer",
            status: false,
          });
        }
      } else {
        res.status(401).json({
          message:
            "UnAuthorized Access Please Login With Producer Account!!!!!!!!!",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(401).json({ message: error.message, status: false });
    }
  }
  async verifyActor(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const LoginToken = req.cookies.LoginToken;
      if (LoginToken) {
        const token: any = Jwt.verify(LoginToken, "AKSHAT");
        console.log(token);
        if (token && token.UserRole === "Actor") {
          req.AdminId = token.UserToken;
          req.Role = token.UserRole;
          next();
        } else {
          res.status(401).json({
            message: "SecretKey Does Not Match or It Is Not A Actor",
            status: false,
          });
        }
      } else {
        res.status(401).json({
          message:
            "UnAuthorized Access Please Login With Actor Account!!!!!!!!!",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(401).json({ message: error.message, status: false });
    }
  }
  async verifyForAll(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const LoginToken = req.cookies.LoginToken;
      if (LoginToken) {
        const token: any = Jwt.verify(LoginToken, "AKSHAT");
        console.log(token);
        if (token) {
          req.AdminId = token.UserToken;
          req.Role = token.UserRole;
          next();
        } else {
          res.status(401).json({
            message: "SecretKey Does Not Match or It Is Not A Admin",
            status: false,
          });
        }
      } else {
        res.status(401).json({
          message:
            "UnAuthorized Access Please Login With Admin Account!!!!!!!!!",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(401).json({ message: error.message, status: false });
    }
  }
}
