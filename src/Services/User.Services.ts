import { users } from "@Models";
import { IUser } from "@interfaces";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export class UserServices {
  async CreateUser(data: IUser) {
    try {
      console.log("second");
      console.log(data);
      const userdata = await users.create(data);
      return {
        message: "User Created Successfully!!!",
        data: userdata,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetUser(UserId: string) {
    try {
      const userdata = await users.findOne({ _id: UserId });
      return { Data: userdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetAllUser(role: String) {
    try {
      if (role) {
        console.log(role);
        const userdata = await users.find({ role: role });
        return { Data: userdata, status: true };
      } else {
        const userdata = await users.find();
        return { Data: userdata, status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async LoginUser(email: String, password: string) {
    try {
      const userdata = await users.find({ email: email });
      if (userdata) {
        const verifypassword = await bcrypt.compare(
          password,
          userdata[0].password
        );
        if (verifypassword) {
          const Token = Jwt.sign(
            { UserToken: userdata[0]._id, UserRole: userdata[0].role },
            "AKSHAT",
            {
              expiresIn: "12h",
            }
          );
          
          return { message: "Login Successful", token: Token, status: true };
        } else {
          return {
            message: "Password Does not Match please provide right password",
            status: true,
          };
        }
      } else {
        return { Message: "User Is Not Available", status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async UpdateUser(id: String, data: IUser) {
    try {
      console.log("second");
      console.log(data);
      const userdata = await users.findByIdAndUpdate(id, data);
      return {
        message: "User Updated Successfully!!!",
        data: userdata,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteUser(id: String) {
    try {
      const userdata = await users.findByIdAndDelete(id);
      return {
        message: "User Deleted Successfully!!!",
        data: userdata,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
