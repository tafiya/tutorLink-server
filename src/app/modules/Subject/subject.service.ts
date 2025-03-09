import { JwtPayload } from "jsonwebtoken";
import { TSubject } from "./subject.interface";
import { User } from "../User/user.model";
import { Subject } from "./subject.model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";


const createSubjectIntoDB=async(userData:JwtPayload,payload:TSubject)=>{
      console.log("User from service",userData)
      const user = await User.isUserExistsByCustomId(userData.email);
      payload.tutor = user._id;
      const result = (await Subject.create(payload));;
      return result;
}
// get all Subjects data
const getALLSubjectsFromDB = async () => {
      const result  = Subject.find().populate('tutor')
      return result;
};

// delete subject
const deleteSubjectFromDB = async (id: string, userData: JwtPayload) => {
      const user = await User.isUserExistsByCustomId(userData.email);
      const isSubjectExists = await Subject.findById(id);
      if (!isSubjectExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This Subject is not found !');
      }
      if (isSubjectExists.tutor.toString() !== user._id.toString()) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          'You are not authorized to delete this Subject',
        );
      }
      await Subject.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    };
    // get a single subject
const getSubjectFromDB = async (id: string) => {
      const result = await Subject.findById(id).populate('tutor');
      if (result == null) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Subject is not exist');
      }
      return result;
    };

// update subject
const updateSubjectFromDB = async (
      id: string,
      payload: Partial<TSubject>,
      userData: JwtPayload,
    ) => {
      const user = await User.isUserExistsByCustomId(userData.email);
      const isSubjectsExists = await Subject.findById(id);
      if (!isSubjectsExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This Subject is not found !');
      }
      if (isSubjectsExists.tutor.toString() !== user._id.toString()) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          'You are not authorized to update this Subject',
        );
      }
      const result = await Subject.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
    
      return result;
    };    

export const subjectServices={
      createSubjectIntoDB,
      getALLSubjectsFromDB,
      deleteSubjectFromDB,updateSubjectFromDB,getSubjectFromDB
}