import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import CONSTANTS from '../helpers/constants';

const { INAVLID_TOKEN, UNAUTHORIZED } = CONSTANTS.MESSAGES;

const IsTokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers?.authorization?.substring(7);

  if (!token) {
    return res.status(403).json({ message: UNAUTHORIZED });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: INAVLID_TOKEN, error: error.message });
  }
};

const extractUserId = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: any; userId: number
    };
    req['userId'] = decoded.id; // Attach userId to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { IsTokenValid, extractUserId };
