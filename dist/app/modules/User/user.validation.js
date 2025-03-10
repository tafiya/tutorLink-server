"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const availabilitySchema = zod_1.z.object({
    from: zod_1.z.string().transform((str) => new Date(str)), // Convert the string to a Date object
    to: zod_1.z.string().transform((str) => new Date(str)), // Convert the string to a Date object
});
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        address: zod_1.z.string().min(1, 'Address is required'),
        phone: zod_1.z.string().min(10, 'Phone number must be at least 10 digits'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
        role: zod_1.z.enum(['Student', 'Tutor']),
        bio: zod_1.z.string().optional(),
        subjects: zod_1.z.string().optional(),
        gradeLevel: zod_1.z.string().optional(),
        availability: availabilitySchema.optional()
            .optional(),
        price: zod_1.z.number().optional(),
        ratings: zod_1.z.array(zod_1.z.object({
            studentId: zod_1.z.string(),
            rating: zod_1.z.number().min(1).max(5),
            comment: zod_1.z.string().optional(),
            timestamp: zod_1.z.date().optional(),
        })).optional(),
        averageRating: zod_1.z.number().min(0).max(5).optional(),
        profilePicture: zod_1.z.string().optional(),
        isBlocked: zod_1.z.boolean().default(false),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
