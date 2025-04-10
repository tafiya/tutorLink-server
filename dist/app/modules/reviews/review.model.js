"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    tutorId: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
}, {
    timestamps: true,
});
const Review = (0, mongoose_1.model)('reviews', ReviewSchema);
exports.default = Review;
