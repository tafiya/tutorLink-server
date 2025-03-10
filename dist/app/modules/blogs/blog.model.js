"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    detail: { type: String, required: true },
    image: { type: String, required: true },
    about: { type: String, required: true },
}, {
    timestamps: true,
});
const Blog = (0, mongoose_1.model)('blogs', BlogSchema);
exports.default = Blog;
