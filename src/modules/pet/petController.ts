import { Request, Response } from "express";
import CONSTANTS from "../../helpers/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import PetUtils from "./petUtils";
import { PET_IMAGE_URL_PREFIX } from "../../middleware/uploadPetImage";

const {
  MESSAGES: {
    INTERNAL_SERVER,
    OK,
    CREATED,
    INTERNAL_SERVER_ERROR_CODE,
    PET_CREATED_SUCCESSFULLY,
    PET_FETCHED_SUCCESSFULLY,
    PET_NOT_FOUND,
    PET_UPDATED_SUCCESSFULLY,
    PET_DELETED_SUCCESSFULLY,
  },
} = CONSTANTS;

export default class PetController {
  private petService: PetUtils;
  private responseBuilder: ResponseBuilder;

  constructor() {
    this.petService = new PetUtils();
    this.responseBuilder = new ResponseBuilder();
  }

  public getPets = async (req: Request, res: Response) => {
    try {
      const { page, limit, search, species, breed, ageMin, ageMax, status } =
        req.query;
      const result = await this.petService.getPets({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search as string,
        species: species as string,
        breed: breed as string,
        ageMin: ageMin != null ? Number(ageMin) : undefined,
        ageMax: ageMax != null ? Number(ageMax) : undefined,
        status: status as string,
      });
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        PET_FETCHED_SUCCESSFULLY,
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

  public getPetById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const pet = await this.petService.getPetById(id);
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        PET_FETCHED_SUCCESSFULLY,
        pet,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        PET_NOT_FOUND,
      );
    }
  };

  public createPet = async (req: Request, res: Response) => {
    try {
      const body = req.body as Record<string, unknown>;
      let imageUrl = "";
      const file = req.file as Express.Multer.File | undefined;
      if (file?.filename) {
        imageUrl = PET_IMAGE_URL_PREFIX + file.filename;
      }
      const pet = await this.petService.createPet({
        name: body.name as string,
        species: body.species as string,
        breed: body.breed as string,
        age: Number(body.age),
        description: (body.description as string) || "",
        imageUrl,
      });
      return this.responseBuilder.responseContent(
        res,
        CREATED,
        true,
        PET_CREATED_SUCCESSFULLY,
        pet,
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

  public updatePet = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body = req.body as Record<string, unknown>;
      let imageUrl: string | undefined;
      const file = req.file as Express.Multer.File | undefined;
      if (file?.filename) {
        imageUrl = PET_IMAGE_URL_PREFIX + file.filename;
      }
      const update: Record<string, unknown> = {};
      if (body.name !== undefined) update.name = body.name;
      if (body.species !== undefined) update.species = body.species;
      if (body.breed !== undefined) update.breed = body.breed;
      if (body.age !== undefined) update.age = Number(body.age);
      if (body.description !== undefined) update.description = body.description;
      if (body.status !== undefined) update.status = body.status;
      if (imageUrl !== undefined) update.imageUrl = imageUrl;
      const pet = await this.petService.updatePet(
        id,
        Object.keys(update).length ? update : undefined,
      );
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        PET_UPDATED_SUCCESSFULLY,
        pet,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        PET_NOT_FOUND,
      );
    }
  };

  public deletePet = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const pet = await this.petService.deletePet(id);
      return this.responseBuilder.responseContent(
        res,
        OK,
        true,
        PET_DELETED_SUCCESSFULLY,
        pet,
      );
    } catch (error) {
      return this.responseBuilder.responseContent(
        res,
        INTERNAL_SERVER_ERROR_CODE,
        false,
        PET_NOT_FOUND,
      );
    }
  };
}
