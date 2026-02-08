import { Router } from "express";
import authRoute from "../modules/auth/authRoutes";
import categoryRoute from "../modules/category/categoryRoutes";

export default class Routes {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public path() {
    this.router.use("/auth", authRoute);
    this.router.use("/category", categoryRoute);



    return this.router;
  }
}
