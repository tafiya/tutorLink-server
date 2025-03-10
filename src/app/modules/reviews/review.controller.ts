import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
    const result = await reviewServices.createReviewIntoDB(req.body);
  
    sendResponse(res, {
      message: 'Review registered successfully',
      statusCode: StatusCodes.CREATED,
      data: result,
    });
  });
  const getReview = catchAsync(async (req, res) => {
    const { tutorId  } = req.params;
    const result = await reviewServices.getReviewFromDB(tutorId );
    sendResponse(res, {
      message: "Tutor fetched successfully",
      statusCode: StatusCodes.OK,
      data: result,
    });
  });
  export const reviewControllers = {
    createReview,getReview
  };
  