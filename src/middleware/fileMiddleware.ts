import { Request, Response, NextFunction } from "express";
import CONSTANTS from "../helpers/constants";
const { INVALID_FILE_TYPE } = CONSTANTS.MESSAGES;

const fileTypeValidation = (req: any, res: Response, next: NextFunction) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const invalidFiles = req["files"]?.filter(
    (file) => !allowedFileTypes.includes(file.mimetype)
  );
  if (invalidFiles.length) {
    return res
      .status(422)
      .json({ message: INVALID_FILE_TYPE, success: false, statusCode: 422 });
  } else {
    next();
  }
};

export default fileTypeValidation;
