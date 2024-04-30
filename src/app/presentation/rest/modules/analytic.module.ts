import { Request, Response, Router } from "express";
import authenticateRequest from "../../../application/middleware/jwt/jwt.middleware";
import analyticUsecase from "../../../application/usecases/analytic.usecase";

const usecase: analyticUsecase = new analyticUsecase()

export default class analyticModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get(
      "/users-orders",
      authenticateRequest(),
      this.userOrderAnalytics
    );
  }

  private async userOrderAnalytics(req: any, res: Response) {
    const { id } = req.user;
    const response = await usecase.userOrderAnalytics(id);
    return res.send(response);
  }
}
