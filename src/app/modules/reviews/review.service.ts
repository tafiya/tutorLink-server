import { IReview } from "./review.interface";
import Review from "./review.model";

const createReviewIntoDB = async (payload: IReview) => {
  const result = await Review.create(payload);
  return result;
};
const getReviewFromDB  = async (tutorId: string) => {
    const requests = await Review.find({ tutorId }).exec();
    return requests;
  };
export const reviewServices = {
    createReviewIntoDB ,getReviewFromDB
};
