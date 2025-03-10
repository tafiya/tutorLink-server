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
exports.AuthServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = require("./auth.utils");
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload.availability);
    if (payload.availability) {
        payload.availability.from = new Date(payload.availability.from);
        payload.availability.to = new Date(payload.availability.to);
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByCustomId(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User is not found');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'The user is deleted');
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userStatus) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'The User is blocked');
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_token, config_1.default.jwt_access_expireIn);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_token, config_1.default.jwt_refresh_expireIn);
    return {
        token,
        refreshToken,
    };
});
const generateRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.jwt_refresh_token);
    const { email } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByCustomId(email);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userStatus) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is blocked ! !');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_token, config_1.default.jwt_access_expireIn);
    return {
        token,
    };
});
exports.AuthServices = {
    registerUserIntoDB,
    loginUser,
    generateRefreshToken,
};
