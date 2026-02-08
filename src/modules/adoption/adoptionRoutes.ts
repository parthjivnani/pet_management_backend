import { Router } from "express";
import { IsTokenValid } from "../../middleware/isTokenValidMiddleware";
import { requireAdmin } from "../../middleware/requireAdmin";
import AdoptionController from "./adoptionController";
import { Validator } from "../../validate";
import { ApplyAdoptionValidator } from "./adoptionValidator";

const router: Router = Router();
const adoptionController = new AdoptionController();
const v: Validator = new Validator();

// User: apply to adopt
router.post(
  "/",
  IsTokenValid,
  v.validate(ApplyAdoptionValidator),
  adoptionController.apply,
);
// User: my applications
router.get("/my", IsTokenValid, adoptionController.getMyApplications);

// Admin: all applications
router.get("/", IsTokenValid, requireAdmin, adoptionController.getAll);
router.get("/:id", IsTokenValid, requireAdmin, adoptionController.getById);
router.patch(
  "/:id/approve",
  IsTokenValid,
  requireAdmin,
  adoptionController.approve,
);
router.patch(
  "/:id/reject",
  IsTokenValid,
  requireAdmin,
  adoptionController.reject,
);

export default router;
