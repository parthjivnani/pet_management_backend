import { Router } from "express";
import { IsTokenValid } from "../../middleware/isTokenValidMiddleware";
import { requireAdmin } from "../../middleware/requireAdmin";
import { uploadPetImage } from "../../middleware/uploadPetImage";
import PetController from "./petController";
import { Validator } from "../../validate";
import { CreatePetValidator, UpdatePetValidator } from "./petValidator";

const router: Router = Router();
const petController = new PetController();
const v: Validator = new Validator();

// Public routes (no auth)
router.get("/", petController.getPets);
router.get("/:id", petController.getPetById);

// Admin only
router.post(
  "/",
  IsTokenValid,
  requireAdmin,
  uploadPetImage,
  v.validate(CreatePetValidator),
  petController.createPet,
);
router.put(
  "/:id",
  IsTokenValid,
  requireAdmin,
  uploadPetImage,
  v.validate(UpdatePetValidator),
  petController.updatePet,
);
router.delete("/:id", IsTokenValid, requireAdmin, petController.deletePet);

export default router;
