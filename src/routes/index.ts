import { Router } from "express";
import authRoute from "../modules/auth/authRoutes";
import petRoute from "../modules/pet/petRoutes";
import adoptionRoute from "../modules/adoption/adoptionRoutes";
import speciesRoute from "../modules/species/speciesRoutes";

export default class Routes {
  private readonly router: Router;
  constructor() {
    this.router = Router();
  }
  public path() {
    this.router.use("/auth", authRoute);
    this.router.use("/pets", petRoute);
    this.router.use("/adoptions", adoptionRoute);
    this.router.use("/species", speciesRoute);
    return this.router;
  }
}
