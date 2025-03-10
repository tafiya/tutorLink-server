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
exports.getBookingsByTutorId = exports.getMyBookings = exports.cancelPayment = exports.failPayment = exports.successPayment = exports.initiatePayment = void 0;
const payment_service_1 = require("./payment.service");
const request_model_1 = __importDefault(require("../sendRequestTutor/request.model"));
const payment_model_1 = __importDefault(require("./payment.model"));
const catchAsync_1 = require("../../utils/catchAsync");
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
;
const initiatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi from controller");
    try {
        const { requestId, selectedDate, amount } = req.body;
        const paymentUrl = yield (0, payment_service_1.processPayment)(requestId, selectedDate, amount);
        res.json({ paymentUrl });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.initiatePayment = initiatePayment;
const successPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.params;
    console.log("Payment success", transactionId);
    const order = yield payment_model_1.default.findOne({ transaction: transactionId });
    console.log(order);
    yield request_model_1.default.findByIdAndUpdate(order === null || order === void 0 ? void 0 : order.requestId, { isPayment: true }, { new: true });
    return res.redirect(`http://localhost:3000/success/${transactionId}`);
});
exports.successPayment = successPayment;
const failPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.params;
    console.log("Payment failed", transactionId);
    const result = yield (0, payment_service_1.handleFailedOrCanceledPayment)(transactionId, "failed");
    return res.redirect(`http://localhost:3000/fail`);
});
exports.failPayment = failPayment;
const cancelPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.params;
    console.log("Payment canceled", transactionId);
    const result = yield (0, payment_service_1.handleFailedOrCanceledPayment)(transactionId, "canceled");
    // if (!result) {
    //     return res.status(404).json({ error: "Transaction not found" });
    // }
    return res.redirect(`http://localhost:3000/cancel`);
});
exports.cancelPayment = cancelPayment;
exports.getMyBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.params;
    const result = yield (0, payment_service_1.getMyBookingsFromDB)(userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'MyBookings retrieved successfully',
        data: result,
    });
}));
const getBookingsByTutorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.params.tutorId;
        const requests = yield (0, payment_service_1.getBookingsForTutor)(tutorId);
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
exports.getBookingsByTutorId = getBookingsByTutorId;
