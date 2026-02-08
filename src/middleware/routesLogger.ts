import { NextFunction, Request, Response } from 'express';
import Log from '../helpers/logger';

const routerInfoLogger = (req: Request, res: Response, next: NextFunction) => {
  const logger = Log.getLogger();
  if (['development'].includes(process?.env?.NODE_ENV)) {
    logger.debug(`${req.method}: ${req.url}`);
  }
  return next();
};

export default routerInfoLogger;
