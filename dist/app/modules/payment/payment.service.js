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
exports.getBookingsForTutor = exports.getMyBookingsFromDB = exports.handleFailedOrCanceledPayment = exports.processPayment = void 0;
// payment.service.ts
const request_model_1 = __importDefault(require("../sendRequestTutor/request.model"));
const sslcommerz_1 = require("sslcommerz");
const payment_model_1 = __importDefault(require("./payment.model"));
const sslcommerz = new sslcommerz_1.SslCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false // Change to true for live mode
);
const processPayment = (requestId, selectedDate, amount) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("from service")
    const transactionId = `txn_${Date.now()}`;
    const updatedRequest = yield request_model_1.default.findByIdAndUpdate(requestId, { selectedDate, price: amount }, { new: true });
    console.log("updated request", updatedRequest);
    if (!updatedRequest) {
        throw new Error("Request not found");
    }
    const paymentData = {
        total_amount: amount,
        currency: "BDT",
        tran_id: transactionId,
        success_url: `http://localhost:5000/api/payment/success/${transactionId}`,
        fail_url: `http://localhost:5000/api/payment/fail`,
        cancel_url: `http://localhost:5000/api/payment/cancel`,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: "Tutor Booking", // Tutor name as the product
        product_category: "Subject", // Subject as the product category
        product_profile: 'general',
        cus_name: "Student",
        cus_email: updatedRequest.userEmail,
        cus_phone: "01700000000",
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        // Use customer phone if available
        cus_fax: '01711111111', // Or remove if not needed
        ship_name: 'Customer Name', // Or use actual shipping name
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const response = yield sslcommerz.init(paymentData);
    // console.log('Order Saved:', response);
    // Save the order data to the database
    const finalOrder = {
        items: "Tutor Booking",
        paidStatus: "true",
        requestId: requestId,
        transaction: transactionId,
        tutorId: updatedRequest.tutorId,
        tutorName: updatedRequest.tutorId,
        totalAmount: updatedRequest.price,
        userEmail: updatedRequest.userEmail,
    };
    const createdOrder = yield payment_model_1.default.create(finalOrder);
    //   console.log('Order Saved:', createdOrder);
    return response.GatewayPageURL;
});
exports.processPayment = processPayment;
const handleFailedOrCanceledPayment = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield payment_model_1.default.findOne({ transaction: transactionId });
    if (!order) {
        return null;
    }
    yield payment_model_1.default.updateOne({ transaction: transactionId }, { paidStatus: status });
    yield request_model_1.default.findByIdAndUpdate(order.requestId, { isPayment: false }, { new: true });
    return order;
});
exports.handleFailedOrCanceledPayment = handleFailedOrCanceledPayment;
const getMyBookingsFromDB = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_model_1.default.find({ userEmail });
});
exports.getMyBookingsFromDB = getMyBookingsFromDB;
const getBookingsForTutor = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield payment_model_1.default.find({ tutorId }).exec();
    return requests;
});
exports.getBookingsForTutor = getBookingsForTutor;
