import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import CONSTANTS from '../helpers/constants';

const { INAVLID_TOKEN, UNAUTHORIZED } = CONSTANTS.MESSAGES;

const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.substring(7);

  if (!token) {
    return res.status(403).json({ message: UNAUTHORIZED });
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    res.locals.user = { userId: user?.id, deviceId: user?.activityId };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: INAVLID_TOKEN, error: error.message });
  }
};
export default decodeToken;
