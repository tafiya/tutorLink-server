import { model, Schema } from "mongoose";
import { TSubject } from "./subject.interface";

const subjectSchema = new Schema<TSubject>({
      name: { type: String, required: true },
      gradeLevel: { type: String, required: true }, // e.g., "High School", "University"
      category: { type: String , required: true}, // Optional: Math, Science, etc.
      tutor: { type:Schema.Types.ObjectId, ref: "User", required: true }, // The tutor who created this subject
     rate: { type: Number, required: true, min: 0 },
     description:{ type: String , required: true}, 
     isDeleted: { type: Boolean, default: false },
},  { timestamps: true },)

// this middleware is used to hide the deleted data from showing main data
subjectSchema.pre('find', function (next) {
      this.find({ isDeleted: { $ne: true } });
      next();
    });
    // this middleware is used to hide the deleted data from searching individual
    subjectSchema.pre('findOne', function (next) {
      this.find({ isDeleted: { $ne: true } });
      next();
    });
    subjectSchema.pre('findOneAndUpdate', function (next) {
      this.find({ isDeleted: { $ne: true } });
      next();
    });
    export const Subject = model<TSubject>('Subject', subjectSchema);
    