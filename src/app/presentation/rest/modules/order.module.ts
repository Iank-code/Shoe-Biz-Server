import { Request, Response, Router } from "express";
import OrderUsecase from "../../../application/usecases/order.usecase";
import { orderType } from "../../../application/utils/helpers";

const usecase: OrderUsecase = new OrderUsecase();

export default class OrderModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/create", this.createOrder);
    this.router.get("/shop", this.getByTag);
    this.router.get("/:id", this.getOrderById);
  }
  private async createOrder(req: Request, res: Response) {
    const {
      customerId,
      productsInfo,
    }: { customerId: string; productsInfo: orderType[]} = req.body;
    const response = await usecase.createOrder(customerId, productsInfo);
    return res.send(response);
  }
  private async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await usecase.getOrderById(id);
    return res.send(response);
  }

  private async getByTag(req: Request, res: Response) {
    const { tag } = req.query;
    console.log(tag);
    const response = await usecase.getByTag(tag);
    return res.send(response);
  }
}
