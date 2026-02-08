import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import CONSTANTS from '../helpers/constants';

const { INAVLID_TOKEN, UNAUTHORIZED } = CONSTANTS.MESSAGES;
const authenticateAPI = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req?.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: UNAUTHORIZED });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = { userId: user?.id, deviceId: user?.activityId };
    res.locals.email = user?.email;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: INAVLID_TOKEN, error: error.message });
  }
};
export default authenticateAPI;
