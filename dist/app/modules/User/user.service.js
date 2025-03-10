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
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getAllTutorsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ role: "Tutor" });
    return result;
});
const getTutorByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield user_model_1.User.findOne({ _id: id, role: "Tutor" });
    if (!tutor) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Tutor not found!");
    }
    return tutor;
});
const getUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    if (result == null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User is not exist');
    }
    return result;
});
const updateUserFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUsersExists = yield user_model_1.User.findById(id);
    if (!isUsersExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This User is not found !');
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.userServices = {
    getAllUsersFromDB,
    updateUserFromDB,
    getAllTutorsFromDB,
    getTutorByIdFromDB,
    getUserFromDB
};
