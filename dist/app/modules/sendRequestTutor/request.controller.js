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
exports.requestController = void 0;
const request_service_1 = require("./request.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("from controller=", req.body);
    const result = yield request_service_1.requestService.sendRequestService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Request is sent successfully',
        data: result,
    });
}));
const getAllRequests = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request_service_1.requestService.getALLRequestsFromDB();
    (0, sendResponse_1.default)(res, {
        message: 'Requests fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getRequestsByTutorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.params.tutorId;
        const requests = yield request_service_1.requestService.getRequestsForTutor(tutorId);
        if (!requests || requests.length === 0) {
            res.json({
                status: false,
                message: "No requests found for this tutor.",
            });
        }
        res.json({
            status: true,
            message: "Requests fetched successfully",
            data: requests,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const updateRequestByTutor = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body; // Contains status, comments, etc.
    const result = yield request_service_1.requestService.updateRequestByTutor(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Request updated successfully",
        data: result,
    });
}));
const getRequestsByStudentEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.params;
        // console.log(userEmail)
        const requests = yield request_service_1.requestService.getRequestsForStudent(userEmail);
        res.json({
            status: true,
            message: "Requests fetched successfully",
            data: requests,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.requestController = {
    createRequest,
    getRequestsByTutorId,
    getRequestsByStudentEmail,
    getAllRequests, updateRequestByTutor
};
