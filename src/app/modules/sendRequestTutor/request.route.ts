import express from 'express';
import { requestController } from "./request.controller";

const router = express.Router();
router.post('/create', requestController.createRequest)
router.get('/', requestController.getAllRequests)
router.get('/get-requests/:tutorId', requestController.getRequestsByTutorId);
router.patch('/:id', requestController.updateRequestByTutor);
router.get('/get/:userEmail', requestController.getRequestsByStudentEmail);


export const RequestRouter =router