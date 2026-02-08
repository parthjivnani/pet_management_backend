/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Response } from 'express';

export class ResponseBuilder {
  /**
   * Send response
   * @param res Object
   * @param statusCode number
   * @param message string
   * @param result Object
   * @returns Object
   */
  public responseContent(
    res: Response,
    statusCode: number,
    success:boolean,
    message: string,
    result?: object,
  ) {
    return res.status(statusCode).json({
      statusCode,
      success,
      message,
      result,
    });
  }

  public static successMessage(message: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 200;
    rb.message = message;
    return rb;
  }

  public static errorMessage(message?: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 500;
    rb.message = message;
    rb.success = true;
    rb.result = null;
    return rb;
  }

  public static badRequest(message: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 400;
    rb.message = message;
    rb.success = true;
    rb.result = null;
    return rb;
  }

  public static notFound(message: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 404;
    rb.message = message;
    rb.success = true;
    rb.result = null;
    return rb;
  }

  public static data(result: any, message?: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 200;
    rb.success = true;
    if (result) {
      result.message = message;
    }
    rb.result = result;
    rb.message = message || null;
    return rb;
  }

  public static error(err: any, message?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    if (err instanceof ResponseBuilder) {
      return err;
    }
    rb.statusCode = 500;
    rb.error = err;
    rb.message = message || null;
    rb.description = err.description;
    rb.result = err;
    return rb;
  }

  public static getSuccessResponse(
    result: any,
    message?: any,
  ): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 200;
    rb.success = true;
    rb.result = result;
    rb.message = message || null;
    return rb;
  }

  public static getErrorResponse(
    result: any,
    message?: any,
    errorCode?: number,
  ): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = errorCode || 404;
    rb.success = false;
    rb.result = result;
    rb.message = message || null;
    return rb;
  }
  public statusCode: number;
  public message: string;
  public error: string;
  public success: boolean;
  public result: any;
  public description: string;
}
