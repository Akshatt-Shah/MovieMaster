import { Router } from "express";
import { UserController } from "@Controllers";
const UserControllers = new UserController();
import { VerifyToken } from "../Middlewares/Verify.Middelware";
const Verify = new VerifyToken();
const URoute = Router();

URoute.post("/user/CreateUser", UserControllers.CreateUser);

URoute.get("/user/GetUserDetails",Verify.verifyForAll, UserControllers.GetUser);

URoute.get("/user/GetAllUser", UserControllers.GetAllUser);

URoute.post("/user/Loginuser", UserControllers.LoginUser);

URoute.put("/user/UpdateUser",Verify.verifyForAll, UserControllers.UpdateUser);

URoute.delete("/user/DeleteUser",Verify.verifyForAll, UserControllers.DeleteUser);

URoute.delete("/user/DeleteUser/:userid",Verify.verifyAdmin, UserControllers.DeleteUserByAdmin);

URoute.post("/user/ResetPassword",Verify.verifyForAll, UserControllers.ResetPasswordUser);

URoute.post("/user/ForgretPassword", UserControllers.ForgetPasswordUser);

URoute.post("/user/VerifyOtp", UserControllers.VerifyOtp);

URoute.post("/user/ForgetPassword", UserControllers.ForgetPassword);

export default URoute;
