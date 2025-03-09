import express from "express";
import { cancelPayment, failPayment, initiatePayment, successPayment } from "./payment.controller";

const router = express.Router();

router.post("/", initiatePayment);
router.post("/success/:transactionId", successPayment);
router.post("/fail", failPayment);
router.post("/cancel", cancelPayment);

export const PaymentRouter= router;
