"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post("/", payment_controller_1.initiatePayment);
router.post("/success/:transactionId", payment_controller_1.successPayment);
router.post("/fail", payment_controller_1.failPayment);
router.post("/cancel", payment_controller_1.cancelPayment);
router.get('/my-bookings/:userEmail', 
// auth('User', 'Admin'), // ✅ Authenticated users only
payment_controller_1.getMyBookings);
router.get('/bookings/:tutorId', 
// auth('User', 'Admin'), // ✅ Authenticated users only
payment_controller_1.getBookingsByTutorId);
exports.PaymentRouter = router;
