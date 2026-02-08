import { Request, Response } from "express";
import CONSTANTS from "../../helpers/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import SpeciesUtils from "./speciesUtils";

const {
  MESSAGES: {
    INTERNAL_SERVER,
    OK,
    CREATED,
    INTERNAL_SERVER_ERROR_CODE,
    SPECIES_CREATED_SUCCESSFULLY,
    SPECIES_FETCHED_SUCCESSFULLY,
    SPECIES_NOT_FOUND,
    SPECIES_UPDATED_SUCCESSFULLY,
    SPECIES_DELETED_SUCCESSFULLY,
  },
} = CONSTANTS;

export default class SpeciesController {
  private speciesService: SpeciesUtils;
  private responseBuilder: ResponseBuilder;

  constructor() {
    this.speciesService = new SpeciesUtils();
    this.responseBuilder = new ResponseBuilder();
  }

  public getSpecies = async (req: Request, res: Response) => {
    try {
      const { page, limit } = req.query;
      const result = await this.speciesService.getSpecies({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      });
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        SPECIES_FETCHED_SUCCESSFULLY,
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

  public getSpeciesById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const species = await this.speciesService.getSpeciesById(id);
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        SPECIES_FETCHED_SUCCESSFULLY,
        species,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        SPECIES_NOT_FOUND,
      );
    }
  };

  public createSpecies = async (req: Request, res: Response) => {
    try {
      const body = req.body as { name: string };
      const species = await this.speciesService.createSpecies({
        name: body.name,
      });
      return this.responseBuilder.responseContent(
        res,
        CREATED,
        true,
        SPECIES_CREATED_SUCCESSFULLY,
        species,
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

  public updateSpecies = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body = req.body as { name?: string };
      const update: { name?: string } = {};
      if (body.name !== undefined) update.name = body.name;
      const species = await this.speciesService.updateSpecies(
        id,
        Object.keys(update).length ? update : undefined,
      );
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        SPECIES_UPDATED_SUCCESSFULLY,
        species,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        SPECIES_NOT_FOUND,
      );
    }
  };

  public deleteSpecies = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const species = await this.speciesService.deleteSpecies(id);
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        SPECIES_DELETED_SUCCESSFULLY,
        species,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        SPECIES_NOT_FOUND,
      );
    }
  };
}
