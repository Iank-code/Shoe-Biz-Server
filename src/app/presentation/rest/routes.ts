import { Router } from "express";
import ProductModule from "./modules/product.module";
import OrderModule from "./modules/order.module";
import customerModule from "./modules/customer.module";
import sellerModule from "./modules/seller.module";
import NewsLetterModule from "./modules/newsLetter.module";
import analyticModule from "./modules/analytic.module";
import MpesaModule from "./modules/mpesa.module";

export default class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.use("/product", new ProductModule().router);
    this.router.use("/customer", new customerModule().router);
    this.router.use("/seller", new sellerModule().router);
    this.router.use("/newsletter", new NewsLetterModule().router);
    this.router.use("/mpesa", new MpesaModule().router);
    this.router.use("/order", new OrderModule().router);
    this.router.use("/analytic", new analyticModule().router);
  }
}
