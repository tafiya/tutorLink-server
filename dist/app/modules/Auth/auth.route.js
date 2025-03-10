"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const user_validation_1 = require("../User/user.validation");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/register', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.userValidationSchema), auth_controller_1.AuthControllers.registerUser);
router.post('/refresh-token', (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controller_1.AuthControllers.refreshToken);
exports.AuthRoutes = router;
