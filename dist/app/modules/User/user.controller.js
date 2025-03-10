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
exports.userControllers = void 0;
// user.controller.ts
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        message: 'User fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getAllTutors = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllTutorsFromDB();
    (0, sendResponse_1.default)(res, {
        message: "Tutors fetched successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getTutorById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.getTutorByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        message: "Tutor fetched successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.getUserFromDB(id);
    (0, sendResponse_1.default)(res, {
        message: 'User fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.updateUserFromDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        message: 'User is updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.userControllers = {
    getAllUsers,
    updateUser,
    getAllTutors,
    getTutorById,
    getSingleUser
};
