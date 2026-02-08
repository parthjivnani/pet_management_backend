import { Request, Response, NextFunction } from "express";
import CONSTANTS from "../helpers/constants";

const { ACCESS_DENIED } = CONSTANTS.MESSAGES;

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const role = res.locals?.role;
  if (role !== "admin") {
    return res.status(403).json({ message: ACCESS_DENIED, success: false });
  }
  next();
};
