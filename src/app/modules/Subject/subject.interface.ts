import { Types } from "mongoose";

export interface TSubject extends Document {
      _id: string, 
      tutor: Types.ObjectId;
      name: String, 
      gradeLevel: String, 
      rate:number,
      category: String, 
      description: String, 
      isDeleted: boolean,
      createdAt: Date, 
      updatedAt: Date 
    }