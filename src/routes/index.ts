import { Router } from "express";
import authRoute from "../modules/auth/authRoutes";
import categoryRoute from "../modules/category/categoryRoutes";
import petRoute from "../modules/pet/petRoutes";
import adoptionRoute from "../modules/adoption/adoptionRoutes";

export default class Routes {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public path() {
    this.router.use("/auth", authRoute);
    this.router.use("/category", categoryRoute);
    this.router.use("/pets", petRoute);
    this.router.use("/adoptions", adoptionRoute);
    return this.router;
  }
}
