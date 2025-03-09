// request.service.ts
import { IRequest } from "./request.interface"
import RequestTutor from "./request.model"

import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";


const sendRequestService = async (payload: IRequest) => {
  const tutorId=payload.tutorId

   // Find if any request already exists for this tutorId
   const isSubjectExists = await RequestTutor.find({ tutorId });

   // Check if the array is not empty
   if (isSubjectExists.length > 0) {
     throw new AppError(StatusCodes.NOT_FOUND, "You already sent request!");
   }
    // const user = await User.isUserExistsByCustomId(userData?.email);
  
        const result = await RequestTutor.create(payload);
        console.log("result=",result)
        return result;
  
 }
const getALLRequestsFromDB = async () => {
      const result  = RequestTutor.find().populate('tutorId')
      return result;
}

    const getRequestsForTutor = async (tutorId: string) => {
      const requests = await RequestTutor.find({ tutorId }).exec();
      return requests;
    };

    const getRequestsForStudent = async (userEmail: string) => {
      try {
        const requests = await RequestTutor.find({ userEmail }).populate('tutorId');
        // console.log(requests, "email");
        return requests;
      } catch (error) {
        console.error("Error fetching requests:", error);
        throw new Error("Failed to fetch requests for the student.");
      }
    };
    const updateRequestByTutor = async (requestId: string, updateData: Partial<IRequest>) => {
      try {
        const updatedRequest = await RequestTutor.findByIdAndUpdate(
          requestId,
          updateData,
          { new: true } // Returns the updated document
        );
    
        if (!updatedRequest) {
          throw new AppError(StatusCodes.NOT_FOUND, "Request not found");
        }
    
        return updatedRequest;
      } catch (error) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update request");
      }
    };
    
  

export const requestService = {
    sendRequestService,
    getRequestsForTutor,
    getRequestsForStudent,
    getALLRequestsFromDB,updateRequestByTutor
}