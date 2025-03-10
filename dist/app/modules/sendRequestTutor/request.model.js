"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    tutorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    userEmail: {
        type: String,
        required: [true, 'Please provide your email'],
    },
    selectedDate: { type: Date },
    price: { type: Number },
    isAccept: { type: Boolean, default: false },
    isPayment: { type: Boolean, default: false },
}, { timestamps: true });
const RequestTutor = (0, mongoose_1.model)('request', requestSchema);
exports.default = RequestTutor;
