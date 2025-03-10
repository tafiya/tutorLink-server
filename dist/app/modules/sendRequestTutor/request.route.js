"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRouter = void 0;
const express_1 = __importDefault(require("express"));
const request_controller_1 = require("./request.controller");
const router = express_1.default.Router();
router.post('/create', request_controller_1.requestController.createRequest);
router.get('/', request_controller_1.requestController.getAllRequests);
router.get('/get-requests/:tutorId', request_controller_1.requestController.getRequestsByTutorId);
router.patch('/:id', request_controller_1.requestController.updateRequestByTutor);
router.get('/get/:userEmail', request_controller_1.requestController.getRequestsByStudentEmail);
exports.RequestRouter = router;
