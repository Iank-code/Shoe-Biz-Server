import { Request, Response, Router } from "express";
import CustomerUsecase from "../../../application/usecases/customer.usecase";

const usecase: CustomerUsecase = new CustomerUsecase();

export default class CustomerModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/register", this.registerCustomer);
  }

  private async registerCustomer(req: Request, res: Response) {
    const payload = req.body;
    const response = await usecase.registerCustomer(payload);

    return res.send(response);
  }
}
