"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestService = void 0;
const request_model_1 = __importDefault(require("./request.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const sendRequestService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorId = payload.tutorId;
    // Find if any request already exists for this tutorId
    const isSubjectExists = yield request_model_1.default.find({ tutorId });
    // Check if the array is not empty
    if (isSubjectExists.length > 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "You already sent request!");
    }
    // const user = await User.isUserExistsByCustomId(userData?.email);
    const result = yield request_model_1.default.create(payload);
    console.log("result=", result);
    return result;
});
const getALLRequestsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = request_model_1.default.find().populate('tutorId');
    return result;
});
const getRequestsForTutor = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield request_model_1.default.find({ tutorId }).exec();
    return requests;
});
const getRequestsForStudent = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield request_model_1.default.find({ userEmail }).populate('tutorId');
        // console.log(requests, "email");
        return requests;
    }
    catch (error) {
        console.error("Error fetching requests:", error);
        throw new Error("Failed to fetch requests for the student.");
    }
});
const updateRequestByTutor = (requestId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRequest = yield request_model_1.default.findByIdAndUpdate(requestId, updateData, { new: true } // Returns the updated document
        );
        if (!updatedRequest) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Request not found");
        }
        return updatedRequest;
    }
    catch (error) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update request");
    }
});
exports.requestService = {
    sendRequestService,
    getRequestsForTutor,
    getRequestsForStudent,
    getALLRequestsFromDB, updateRequestByTutor
};
