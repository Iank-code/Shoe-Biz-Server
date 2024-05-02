import { Request, Response, Router } from "express";
import OrderUsecase from "../../../application/usecases/order.usecase";
import { orderType } from "../../../application/utils/helpers";
import authenticateRequest from "../../../application/middleware/jwt/jwt.middleware";

const usecase: OrderUsecase = new OrderUsecase();

export default class OrderModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/create", authenticateRequest(), this.createOrder);
    this.router.get("/", authenticateRequest(), this.getOrders);
    this.router.get("/shop", this.getByTag);
    this.router.get("/:id", this.getOrderById);
    this.router.get("/all/admin/", authenticateRequest(), this.getAdminOrders);
  }
  private async createOrder(req: any, res: Response) {
    const { productsInfo }: { productsInfo: orderType[] } = req.body;
    const { id } = req.user;
    const response = await usecase.createOrder(id, productsInfo);
    return res.send(response);
  }
  private async getOrders(req: any, res: Response) {
    const { id } = req.user;
    const response = await usecase.getOrders(id);
    return res.send(response);
  }
  private async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await usecase.getOrderById(id);
    return res.send(response);
  }

  private async getByTag(req: Request, res: Response) {
    const { tag } = req.query;
    const response = await usecase.getByTag(tag);
    return res.send(response);
  }

  private async getAdminOrders(req: any, res: Response) {
    const { id, email } = req.user;
    const response = await usecase.getAdminOrders(id, email);
    return res.send(response);
  }
}
