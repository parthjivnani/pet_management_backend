/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from "lodash";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import CONSTANTS from "../../helpers/constants";
import AuthService from "../../helpers/authService";
import EmailService from "../../helpers/sendEmail";
import Utils from "../../helpers/utils";
import User from "../user/userModel";
const {
  MESSAGES: {
    LOGIN_SUCCESS,
    INTERNAL_SERVER,
    ACCOUNT_NOT_EXIST,
    ACCOUNT_DEACTIVATED,
    INCORRECT_PASSWORD,
    OK,
    SIGNUP_SUCCESS,
    CREATED,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR_CODE,
    PASSWORD_CHANGE_SUCESSFULLY,
    FAILED,
    FORGOT_PASSWORD_LINK_EXPIRED,
    FORGOT_PASSWORD_LINK_SEND,
    EMAIL_INVALID,
    NOT_FOUND
  },
} = CONSTANTS;

export default class AuthController {
  private authService: AuthService;
  private responseBuilder: ResponseBuilder;
  private emailService: EmailService;
  private utils: Utils;

  constructor() {
    this.authService = new AuthService();
    this.responseBuilder = new ResponseBuilder();
    this.emailService = new EmailService();
    this.utils = new Utils();
  }

  public test = (req: Request | any, res: Response) => {
    return this.responseBuilder.responseContent(res, OK, true, "This is a test routing!");
  };

  /**
   * Signup
   * @param req 
   * @param res
   * @returns
   * @description Signup
   */
  public signup = async (req: Request | any, res: Response) => {
    try {
      const { body } = req;
      const { firstName, lastName, email, password } = body;
      const createUser = await User.create({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10)
      });

      return this.responseBuilder.responseContent(res, CREATED, true, SIGNUP_SUCCESS, createUser);

    } catch (err) {
      return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
    }
  };

  /**
   * Login
   * @param req 
   * @param res
   * @returns
   * @description Login
   */
  public login = async (req: Request | any, res: Response) => {

    try {
      const { password, email } = req.body;
      const user = await User.findOne({ email });
      if (isEmpty(user)) {
        return this.responseBuilder.responseContent(
          res,
          FORBIDDEN,
          false,
          ACCOUNT_NOT_EXIST
        );
      }

      if (!user.isActive || user.isDeleted) {
        return this.responseBuilder.responseContent(
          res,
          FORBIDDEN,
          false,
          ACCOUNT_DEACTIVATED
        );
      }
      const resp = await this.authService.generateCookieToken(res, { email: user.email, id: user.id });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return this.responseBuilder.responseContent(res, FORBIDDEN, false, INCORRECT_PASSWORD);
      }

      return this.responseBuilder.responseContent(res, OK, true, LOGIN_SUCCESS, {
        user,
        token: resp.locals.token
      });
    } catch (err) {
      return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
    }
  };

  /**
   * Send verification link
   * @param req 
   * @param res
   * @returns
   * @description Send verification link
   */
  public sendVerificationLink = async (req: Request, res: Response) => {
    try {
      const { email, path: pathName } = req.body;
      const user = await User.findOne({ email });
      if (!isEmpty(user)) {
        // update isPasswordReset to 0 to enable password reset
        await User.updateOne({ email }, { isPasswordReset: 0 })

        const { id, firstName, lastName } = user;
        const expired = '30m';
        const token = await this.authService.getAuthToken(
          { userId: id, email, firstName, lastName },
          expired,
        );

        const url = `${process.env.SITE_URL}/${pathName}/${token}`;

        return this.responseBuilder.responseContent(res, OK, true, FORGOT_PASSWORD_LINK_SEND, { forgotPasswordLink: url });
      } else {
        return this.responseBuilder.responseContent(res, NOT_FOUND, false, EMAIL_INVALID);
      }
    } catch (err) {
      return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
    }
  };

  /**
   * Forgot password
   * @param req 
   * @param res
   * @returns
   * @description Forgot password
   */
  public forgotPassword = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const email = res.locals.email;
      const user = await User.findOne({ email });
      // check isPasswordReset is 0 to verify password is reset only once with a link
      if (user && !user.isPasswordReset) {
        const hashPassword = await this.utils.encryptPassword(password);
        const userRes = await User.updateOne({ email }, { password: hashPassword });
        if (isEmpty(userRes)) {
          return this.responseBuilder.responseContent(res, 403, false, FAILED, null);
        }
        res
          .status(OK)
          .json(
            ResponseBuilder.getSuccessResponse({}, PASSWORD_CHANGE_SUCESSFULLY)
          );
      } else {
        this.responseBuilder.responseContent(res, 500, false, FORGOT_PASSWORD_LINK_EXPIRED);
      }
    } catch (err) {
      this.responseBuilder.responseContent(res, 500, false, INTERNAL_SERVER);
    }
  };

}

