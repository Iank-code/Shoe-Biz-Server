import { Request, Response, Router } from "express";
import sellerUsecase from "../../../application/usecases/seller.usecase";
import authenticateRequest from "../../../application/middleware/jwt/jwt.middleware";

const usecase: sellerUsecase = new sellerUsecase();

export default class sellerModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/register", this.registerAdmin);
    this.router.post("/login", this.loginAdmin);
    this.router.get("/profile", authenticateRequest(), this.adminProfile);
    this.router.post(
      "/profile/update",
      authenticateRequest(),
      this.updateSeller
    );
  }

  private async registerAdmin(req: Request, res: Response) {
    const payload = req.body;
    const response = await usecase.registerSeller(payload);

    return res.send(response);
  }

  private async loginAdmin(req: Request, res: Response) {
    const payload = req.body;
    const response = await usecase.loginSeller(payload);

    return res.send(response);
  }

  private async adminProfile(req: any, res: Response) {
    const { id } = req.user;
    const response = await usecase.sellerProfile(id);

    return res.send(response);
  }

  private async updateSeller(req: any, res: Response) {
    const { id } = req.user;
    const payload = req.body;
    const response = await usecase.updateSeller(id, payload);

    return res.send(response);
  }
}
