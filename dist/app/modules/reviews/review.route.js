"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/", review_controller_1.reviewControllers.createReview); // Add review
router.get("/:tutorId", review_controller_1.reviewControllers.getReview); // Get all reviews for a tutor
exports.ReviewRoutes = router;
