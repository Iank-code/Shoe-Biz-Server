import { Request, Response, Router } from "express";
import ProductUsecase from "../../../application/usecases/product.usecase";

const usecase: ProductUsecase = new ProductUsecase();

export default class ProductModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get("/getall", this.getAll);
  }
  private async getAll(req: Request, res: Response) {
    const response = await usecase.getAll();
    return res.send(response)
  }
}
