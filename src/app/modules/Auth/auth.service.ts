import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const registerUserIntoDB = async (payload: TUser) => {
  console.log(payload.availability)
  if (payload.availability) {
    payload.availability.from = new Date(payload.availability.from);
    payload.availability.to = new Date(payload.availability.to);
  }
  
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The user is deleted');
  }
  // checking if the user is blocked
  const userStatus = user?.isBlocked;
  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is blocked');
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expireIn as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expireIn as string,
  );

  return {
    token,
    refreshToken,
  };
};
const generateRefreshToken = async (refreshToken: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    refreshToken,
    config.jwt_refresh_token as string,
  ) as JwtPayload;
  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expireIn as string,
  );

  return {
    token,
  };
};
export const AuthServices = {
  registerUserIntoDB,
  loginUser,
  generateRefreshToken,
};
