import { Request, Response } from "express";
import CONSTANTS from "../../helpers/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import AdoptionUtils from "./adoptionUtils";

const {
  MESSAGES: {
    INTERNAL_SERVER,
    OK,
    CREATED,
    INTERNAL_SERVER_ERROR_CODE,
    ADOPTION_APPLICATION_SUBMITTED,
    ADOPTION_FETCHED_SUCCESSFULLY,
    ADOPTION_APPROVED,
    ADOPTION_REJECTED,
    ADOPTION_NOT_FOUND,
    PET_NOT_AVAILABLE,
    ALREADY_APPLIED,
  },
} = CONSTANTS;

export default class AdoptionController {
  private adoptionService: AdoptionUtils;
  private responseBuilder: ResponseBuilder;

  constructor() {
    this.adoptionService = new AdoptionUtils();
    this.responseBuilder = new ResponseBuilder();
  }

  public apply = async (req: Request, res: Response) => {
    try {
      const userId = res.locals?.id;
      const { petId, message } = req.body;
      const adoption = await this.adoptionService.apply(userId, petId, message);
      return this.responseBuilder.responseContent(
        res,
        CREATED,
        true,
        ADOPTION_APPLICATION_SUBMITTED,
        adoption,
      );
    } catch (error: any) {
      const msg =
        error?.message === "PET_NOT_AVAILABLE"
          ? PET_NOT_AVAILABLE
          : error?.message === "ALREADY_APPLIED"
            ? ALREADY_APPLIED
            : INTERNAL_SERVER;
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        msg,
      );
    }
  };

  public getMyApplications = async (req: Request, res: Response) => {
    try {
      const userId = res.locals?.id;
      const list = await this.adoptionService.getByUser(userId);
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        ADOPTION_FETCHED_SUCCESSFULLY,
        list,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        INTERNAL_SERVER,
      );
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const { page, limit, status } = req.query;
      const result = await this.adoptionService.getAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        status: status as string,
      });
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        ADOPTION_FETCHED_SUCCESSFULLY,
        result,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        INTERNAL_SERVER,
      );
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const adoption = await this.adoptionService.getById(id);
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        ADOPTION_FETCHED_SUCCESSFULLY,
        adoption,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        ADOPTION_NOT_FOUND,
      );
    }
  };

  public approve = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const adoption = await this.adoptionService.approve(id);
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        ADOPTION_APPROVED,
        adoption,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        ADOPTION_NOT_FOUND,
      );
    }
  };

  public reject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const adoption = await this.adoptionService.reject(id);
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        ADOPTION_REJECTED,
        adoption,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        ADOPTION_NOT_FOUND,
      );
    }
  };
}
