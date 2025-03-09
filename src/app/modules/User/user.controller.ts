// user.controller.ts
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
      const result = await userServices.getAllUsersFromDB();
      sendResponse(res, {
        message: 'User fetched successfully',
        statusCode: StatusCodes.OK,
        data: result,
      });
    });
    
    const getAllTutors = catchAsync(async (req, res) => {
      const result = await userServices.getAllTutorsFromDB();
      sendResponse(res, {
        message: "Tutors fetched successfully",
        statusCode: StatusCodes.OK,
        data: result,
      });
    });    
    const getTutorById = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await userServices.getTutorByIdFromDB(id);
      sendResponse(res, {
        message: "Tutor fetched successfully",
        statusCode: StatusCodes.OK,
        data: result,
      });
    }); 
    const getSingleUser = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await userServices.getUserFromDB(id);
      sendResponse(res, {
        message: 'User fetched successfully',
        statusCode: StatusCodes.OK,
        data: result,
      });
    });
const updateUser = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await userServices.updateUserFromDB(id, req.body);
      sendResponse(res, {
        message: 'User is updated successfully',
        statusCode: StatusCodes.OK,
        data: result,
      });
    });   

    export const userControllers = {
      getAllUsers,
      updateUser,
      getAllTutors,
      getTutorById ,
      getSingleUser
    };
    