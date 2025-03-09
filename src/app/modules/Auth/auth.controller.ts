import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, token } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: { token: token },
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.generateRefreshToken(refreshToken);

  sendResponse(res, {
    message: 'Access token is retrieved successfully!',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
};
