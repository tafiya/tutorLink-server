import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await blogServices.getALLBlogsFromDB();
    sendResponse(res, {
      message: 'Blogs fetched successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });
  });
  export const BlogControllers={
    getAllBlogs
      }