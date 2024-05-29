export interface IUser {
  _id?: string;
  name: string;
  password: string;
  DOB: Date;
  Age: number;
  gender: string;
  role: string;
  email: string;
  otp?: number;
}
