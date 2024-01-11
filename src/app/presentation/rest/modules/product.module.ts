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
    this.router.get("/product/:id", this.getById);
  }
  private async getAll(req: Request, res: Response) {
    const response = await usecase.getAll();
    return res.send(response);
  }
  private async getById(req: Request, res: Response) {
    const {id} = req.params
    const response = await usecase.getById(id);
    return res.send(response);
  }
}
