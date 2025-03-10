"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchema = void 0;
const zod_1 = require("zod");
exports.requestSchema = zod_1.z.object({
    body: zod_1.z.object({
        tutorId: zod_1.z.string().optional(),
        userEmail: zod_1.z.string().email("Invalid email format").nonempty("Email is required"),
        isAccept: zod_1.z.boolean().default(false),
        isPayment: zod_1.z.boolean().default(false),
        price: zod_1.z.number().optional(),
        selectedDate: zod_1.z.date().optional()
    })
});
