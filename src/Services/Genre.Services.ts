import { generes } from "@Models";
import { IGenre } from "@interfaces";

export class GenereServices {
  async CreateGenere(data: IGenre) {
    try {
      const generedata = await generes.create(data);
      return {
        message: "Genere Created Successfully",
        Data: generedata,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetGenere() {
    try {
      const generedata = await generes.find();
      return {
        Data: generedata,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteGenere(Id: string) {
    try {
      const generedata = await generes.findByIdAndDelete(Id);
      return {
        message: "Genere Deleted Successfully..........",
        Data: generedata,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
