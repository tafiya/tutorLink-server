import { z } from "zod";

const subjectValidationSchema = z.object({
      body: z.object({
            name: z.string().min(1, "Name is required"),
            gradeLevel: z.string().min(1, "Grade level is required"),
            category: z.string().min(1, "Category is required"),
            tutor: z.string().optional(), // MongoDB ObjectId is a string
            rate: z.number().min(0, "Rate must be a positive number"),
            description: z.string().min(1, "Description is required"),
            isDeleted: z.boolean().optional(),
      })

});

export const SubjectValidation={
      subjectValidationSchema
}
