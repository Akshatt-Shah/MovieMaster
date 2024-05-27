import { IRatingandReview } from "@interfaces";
import { rating } from "@Models";

export class ReviewServices {
  async Addreview(Data: IRatingandReview) {
    try {
      const RatingData = await rating.create(Data);
      return {
        message: "Rating And Review Added Successfully",
        Data: RatingData,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async Getreview(MovId: string) {
    try {
      const RatingData = await rating.find({ movieid: MovId });
      return {
        message: "Rating And Review retriewed Successfully",
        Data: RatingData,
        status: true,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
