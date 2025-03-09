import express from 'express';
import { userControllers } from './user.controller';
import { auth } from '../../middleware/auth';

// import { userControllers } from './user.controller';

const router = express.Router();
router.get('/', userControllers.getAllUsers);
router.get('/tutors', userControllers.getAllTutors);
router.get("/tutors/:id", userControllers.getTutorById);
router.get("/:id", userControllers.getSingleUser);
router.patch('/:id', userControllers.updateUser);

export const UserRoutes = router;
