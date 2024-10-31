import { Request, Response, Router } from "express";
import CustomerUsecase from "../../../application/usecases/customer.usecase";
import authenticateRequest from "../../../application/middleware/jwt/jwt.middleware";

const usecase: CustomerUsecase = new CustomerUsecase();

export default class CustomerModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/register", this.registerCustomer);
    this.router.post("/login", this.loginCustomer);
    this.router.get("/profile", authenticateRequest(), this.customerProfile);
    this.router.post(
      "/profile/update",
      authenticateRequest(),
      this.updateCustomer
    );
    this.router.post("/logout", authenticateRequest(), this.logoutUser);
  }

  private async registerCustomer(req: Request, res: Response) {
    const payload = req.body;
    const response = await usecase.registerCustomer(payload);

    return res.send(response);
  }

  private async loginCustomer(req: Request, res: Response) {
    const payload = req.body;
    const response = await usecase.loginCustomer(payload);

    return res.send(response);
  }

  private async customerProfile(req: any, res: Response) {
    const { id } = req.user;
    const response = await usecase.customerProfile(id);

    return res.send(response);
  }

  private async updateCustomer(req: any, res: Response) {
    const { id } = req.user;
    const payload = req.body;
    const response = await usecase.updateCustomer(id, payload);

    return res.send(response);
  }

  private async logoutUser(req: any, res: Response) {
    const { token } = req.user
    const response = await usecase.logoutUser(token)

    return res.send(response)
  }
}
