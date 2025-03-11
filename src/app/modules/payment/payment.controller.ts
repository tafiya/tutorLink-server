// payment.controller.ts
import { Request, Response } from "express";
import { getBookingsForTutor, getMyBookingsFromDB, handleFailedOrCanceledPayment, processPayment } from "./payment.service";
import RequestTutor from "../sendRequestTutor/request.model";
import Payment from "./payment.model";
import { catchAsync } from "../../utils/catchAsync";

import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
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

        
    return res.redirect(`https://tutor-link-frontend-project.vercel.app/success/${transactionId}`);
};
export const failPayment = async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    console.log("Payment failed", transactionId);

    const result = await handleFailedOrCanceledPayment(transactionId, "failed");
 

    return res.redirect(`https://tutor-link-frontend-project.vercel.app/fail`);
};

export const cancelPayment = async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    console.log("Payment canceled", transactionId);

    const result = await handleFailedOrCanceledPayment(transactionId, "canceled");
    // if (!result) {
    //     return res.status(404).json({ error: "Transaction not found" });
    // }

    return res.redirect(`https://tutor-link-frontend-project.vercel.app/cancel`);
};
export const getMyBookings = catchAsync(async (req, res) => {
    const { userEmail } = req.params;

  
    const result = await getMyBookingsFromDB(userEmail);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'MyBookings retrieved successfully',
      data: result,
    });
  });
 export const getBookingsByTutorId = async (req: Request, res: Response) => {
    try {
      const tutorId = req.params.tutorId;
      const requests = await getBookingsForTutor(tutorId);
  
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
    } catch (error) {
      res.json({
        status: false,
        message: 'Something went wrong',
        error,
      });
    }
  };
