import { Request, Response, Router } from "express";
import ProductUsecase from "../../../application/usecases/product.usecase";
import authenticateRequest from "../../../application/middleware/jwt/jwt.middleware";

const usecase: ProductUsecase = new ProductUsecase();

export default class ProductModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/", authenticateRequest(), this.addShoe);
    this.router.get("/getall", this.getAll);
    this.router.get("/shop", this.getByTag);
    this.router.get("/product/:id", this.getById);
    this.router.delete(
      "/:productId",
      authenticateRequest(),
      this.deleteProduct
    );
  }
  private async getAll(_: Request, res: Response) {
    const response = await usecase.getAll();
    return res.send(response);
  }

  private async addShoe(req: any, res: Response) {
    const { id } = req.user;

    const { name, description, oldPrice, newPrice, imageUrl } = req.body;

    const response = await usecase.addShoe(
      id,
      name,
      description,
      oldPrice,
      newPrice,
      imageUrl
    );
    return res.send(response);
  }

  private async deleteProduct(req: any, res: Response) {
    const { id } = req.user;
    const { productId } = req.params;
    const response = await usecase.deleteProduct(id, productId);
    return res.send(response);
  }

  private async getById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await usecase.getById(id);
    return res.send(response);
  }

  private async getByTag(req: Request, res: Response) {
    const { tag } = req.query;
    const response = await usecase.getByTag(tag);
    return res.send(response);
  }
}
