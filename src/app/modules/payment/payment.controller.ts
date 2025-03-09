// payment.controller.ts
import { Request, Response } from "express";
import { handleFailedOrCanceledPayment, processPayment } from "./payment.service";
import RequestTutor from "../sendRequestTutor/request.model";
import Payment from "./payment.model";
;

export const initiatePayment = async (req: Request, res: Response) => {
    console.log("hi from controller")
    try {
        const { requestId, selectedDate, amount } = req.body;
        const paymentUrl = await processPayment(requestId, selectedDate, amount);
        res.json({ paymentUrl });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const successPayment = async (req: Request, res: Response) => {
    const {transactionId}= req.params;
    console.log("Payment success",transactionId)
const order = await Payment.findOne({ transaction:transactionId });
        console.log(order)
await RequestTutor.findByIdAndUpdate(order?.requestId, { isPayment: true }, { new: true });

        
    return res.redirect(`http://localhost:3000/success/${transactionId}`);
};
export const failPayment = async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    console.log("Payment failed", transactionId);

    const result = await handleFailedOrCanceledPayment(transactionId, "failed");
    // if (!result) {
    //     return res.status(404).json({ error: "Transaction not found" });
    // }

    return res.redirect(`http://localhost:3000/fail`);
};

export const cancelPayment = async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    console.log("Payment canceled", transactionId);

    const result = await handleFailedOrCanceledPayment(transactionId, "canceled");
    // if (!result) {
    //     return res.status(404).json({ error: "Transaction not found" });
    // }

    return res.redirect(`http://localhost:3000/cancel`);
};
