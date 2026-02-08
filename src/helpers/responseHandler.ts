/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import CONSTANTS from '../helpers/constants';
const {
  MESSAGES: {
    OK,
    SUCCESS,
    CREATED,
    BAD_REQ,
    NOT_FOUND,
    INVALID_CREDENTIAL,
    FORBIDDEN,
    NOT_RECORD_FOUND,
    INTERNAL_SERVER_ERROR_CODE,
    RECORD_ADDED_SUCCESS,
    UPDATE_SUCCESS,
    INTERNAL_SERVER,
    UPDATE_RECORD_FAIL,
    RECORD_DELETE_SUCCESS,
    RECORD_DELETE_FAILED,
    DB_DEPENDENCy,
    FEEDBACK_SUBMIT,
  },
} = CONSTANTS;

export default class ResponseHandler {
  /**
   * Send a success response with a custom message and result.
   * @param res - Express Response object.
   * @param result - data to be included in the response.
   * @param message - Custom success message (default: 'Success').
   */
  public static getSuccessResponse(res: Response, result: any) {
    const response = {
      statusCode: 200,
      success: true,
      message: SUCCESS,
      result,
    };
    res.status(OK).json(response);
  }

  /**
   * Send a created response with result.
   * @param res - Express Response object.
   * @param result - data to be included in the response.
   */
  public static createResponse(res: Response, result: any) {
    const response = {
      statusCode: 200,
      success: true,
      result,
      message: RECORD_ADDED_SUCCESS,
    };
    res.status(CREATED).json(response);
  }

  /**
   * Send a created response with result.
   * @param res - Express Response object.
   * @param result - data to be included in the response.
   */
  public static updateResponse(res: Response) {
    const response = {
      statusCode: 200,
      success: true,
      message: UPDATE_SUCCESS,
    };
    res.status(OK).json(response);
  }

  /**
   * Send a delete success response.
   * @param res - Express Response object.
   * @param message - Custom success message (default: 'Resource deleted successfully.').
   */
  public static deleteResponse(res: Response) {
    const response = {
      statusCode: 200,
      success: true,
      message: RECORD_DELETE_SUCCESS,
    };
    res.status(OK).json(response);
  }

  /**
   * Send a delete failure response.
   * @param res - Express Response object.
   * @param message - Custom success message (default: 'Resource deleted failure.').
   */
  public static deleteFailureResponse(res: Response) {
    const response = {
      statusCode: 200,
      success: true,
      message: RECORD_DELETE_FAILED,
    };
    res.status(OK).json(response);
  }

  /**
   * Send a dependecy error response.
   * @param res - Express Response object.
   * @param message - message: 'Record(s) cannot be deleted, dependency exists with record(s).').
   */
  public static depedencyResponse(res: Response) {
    const response = {
      statusCode: 200,
      success: false,
      message: DB_DEPENDENCy,
    };
    res.status(BAD_REQ).json(response);
  }

  /**
   * Send a bad request response with a custom error message.
   * @param res - Express Response object.
   * @param message - Custom error message.
   */
  public static badRequestResponse(res: Response) {
    const response = {
      statusCode: 400,
      success: false,
      message: UPDATE_RECORD_FAIL,
    };
    res.status(BAD_REQ).json(response);
  }

  /**
   * Send a not found response when a resource is not found.
   * @param res - Express Response object.
   */
  public static notFoundResponse(res: Response) {
    const response = {
      statusCode: 404,
      success: false,
      message: NOT_RECORD_FOUND,
    };
    res.status(NOT_FOUND).json(response);
  }

  /**
   * Send a forbidden response when the user is not authorized.
   * @param res - Express Response object.
   */
  public static forbiddenResponse(res: Response) {
    const response = {
      success: false,
      message: 'Access to this resource is forbidden.',
    };
    res.status(FORBIDDEN).json(response);
  }

  /**
   * Send an unauthorized response when the user is not authenticated.
   * @param res - Express Response object.
   */
  public static unauthorizedResponse(res: Response, message: string) {
    const response = {
      success: false,
      message,
    };
    res.status(INVALID_CREDENTIAL).json(response);
  }

  /**
   * Send an internal server error response.
   * @param res - Express Response object.
   * @param message - Custom error message.
   */
  public static sendInternalErrorResponse(res: Response) {
    const response = {
      success: false,
      message: INTERNAL_SERVER,
    };
    res.status(INTERNAL_SERVER_ERROR_CODE).json(response);
  }

  /**
   * Send an custom error response.
   * @param res - Express Response object.
   * @param message - Custom error message.
   */
  public static getErrorResponse(res: Response, message: string, code: number) {
    const response = {
      success: false,
      message,
    };
    res.status(code).json(response);
  }

  /**
   * Send a feedback response with result.
   * @param res - Express Response object.
   * @param result - data to be included in the response.
   */
  public static feedbackResponse(res: Response, result: any) {
    const response = {
      success: true,
      result,
      message: FEEDBACK_SUBMIT,
    };
    res.status(CREATED).json(response);
  }
}
