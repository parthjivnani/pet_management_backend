/* eslint-disable @typescript-eslint/no-explicit-any */
import * as UAParser from 'ua-parser-js';
import { Request, Response, NextFunction } from 'express';

const parseUserAgent = (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  const userAgent = req.headers['user-agent'];
  const parser = new UAParser();
  const parsedUserAgent = parser.setUA(userAgent).getResult();
  req.deviceData = {
    deviceType: parsedUserAgent?.device?.type,
    deviceVendor: parsedUserAgent?.device?.vendor,
    deviceModel: parsedUserAgent?.device?.model,
    browserName: parsedUserAgent?.browser?.name,
    browserVersion: parsedUserAgent?.browser?.version,
    os: parsedUserAgent?.os?.name,
    osVersion: parsedUserAgent?.os?.version,
  };
  next();
};

export default parseUserAgent;
