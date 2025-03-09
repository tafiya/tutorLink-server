import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { subjectServices } from "./subject.service";


const createSubject=catchAsync(async (req, res) => {
      const user = req.user;
      const order = await subjectServices.createSubjectIntoDB(user, req.body);
      sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Subject is created successfully',
        data: order,
      });
    });
    const getAllSubjects = catchAsync(async (req, res) => {
      const result = await subjectServices.getALLSubjectsFromDB();
      sendResponse(res, {
        message: 'Subjects fetched successfully',
        statusCode: StatusCodes.OK,
        data: result,
      });
    });
    // get a single Subject
const getSubject = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await subjectServices.getSubjectFromDB(id);
      sendResponse(res, {
        message: 'Subject fetched successfully',
        statusCode: StatusCodes.OK,
        data: result,
      });
    });
    const updateSubject = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await subjectServices.updateSubjectFromDB(id, req.body, req.user);
      sendResponse(res, {
        message: 'Subject is updated successfully',
        statusCode: StatusCodes.OK,
        data: result,
      });
    });
    const deleteSubject = catchAsync(async (req, res) => {
      const { id } = req.params;
      await subjectServices.deleteSubjectFromDB(id, req.user);
      sendResponse(res, {
        message: 'Subject is deleted successfully',
        statusCode: StatusCodes.OK,
      });
    });     

    export const SubjectControllers={
      createSubject,
      getAllSubjects,deleteSubject,getSubject,updateSubject
    }