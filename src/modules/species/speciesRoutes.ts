import { Router } from "express";
import { IsTokenValid } from "../../middleware/isTokenValidMiddleware";
import { requireAdmin } from "../../middleware/requireAdmin";
import SpeciesController from "./speciesController";
import { Validator } from "../../validate";
import {
  CreateSpeciesValidator,
  UpdateSpeciesValidator,
} from "./speciesValidator";

const router: Router = Router();
const speciesController = new SpeciesController();
const v: Validator = new Validator();

// Admin only - list and get by id
router.get("/", IsTokenValid, requireAdmin, speciesController.getSpecies);
router.get(
  "/:id",
  IsTokenValid,
  requireAdmin,
  speciesController.getSpeciesById,
);
router.post(
  "/",
  IsTokenValid,
  requireAdmin,
  v.validate(CreateSpeciesValidator),
  speciesController.createSpecies,
);
router.put(
  "/:id",
  IsTokenValid,
  requireAdmin,
  v.validate(UpdateSpeciesValidator),
  speciesController.updateSpecies,
);
router.delete(
  "/:id",
  IsTokenValid,
  requireAdmin,
  speciesController.deleteSpecies,
);

export default router;
