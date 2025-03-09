import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';

import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../User/user.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.registerUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
export const AuthRoutes = router;
