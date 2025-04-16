// request.controller.ts
import { Request, Response } from "express"
import { requestService } from "./request.service"
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createRequest=catchAsync(async (req, res) => {
  const result = await requestService.sendRequestService(req.body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Request is sent successfully',
    data: result,
  });
});
const getAllRequests = catchAsync(async (req, res) => {
  const result = await requestService.getALLRequestsFromDB();
  sendResponse(res, {
    message: 'Requests fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getRequestsByTutorId = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId;
    const requests = await requestService.getRequestsForTutor(tutorId);

    if (!requests || requests.length === 0) {
      res.json({
        status: false,
        message: "No requests found for this tutor.",
      });
    }

    res.json({
      status: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};
const updateRequestByTutor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body; // Contains status, comments, etc.

  const result = await requestService.updateRequestByTutor(id, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Request updated successfully",
    data: result,
  });
});
const getRequestsByStudentEmail = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;
    // console.log(userEmail)
    const requests = await requestService.getRequestsForStudent(userEmail);
    res.json({
      status: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};


export const requestController = {
  createRequest,
  getRequestsByTutorId,
  getRequestsByStudentEmail,
  getAllRequests,updateRequestByTutor
};
