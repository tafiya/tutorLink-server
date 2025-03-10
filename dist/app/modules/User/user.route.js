"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
// import { userControllers } from './user.controller';
const router = express_1.default.Router();
router.get('/', user_controller_1.userControllers.getAllUsers);
router.get('/tutors', user_controller_1.userControllers.getAllTutors);
router.get("/tutors/:id", user_controller_1.userControllers.getTutorById);
router.get("/:id", user_controller_1.userControllers.getSingleUser);
router.patch('/:id', user_controller_1.userControllers.updateUser);
exports.UserRoutes = router;
