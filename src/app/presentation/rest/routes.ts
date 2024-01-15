import { Router } from "express";
import ProductModule from "./modules/product.module";
// import ApplicationModule from "./modules/application.module";
// import GetInTouchModule from "./modules/GetInTouch.module";
import OrderModule from "./modules/order.module";
import customerModule from "./modules/customer.module";
// import MpesaModule from "./modules/mpesa.module";

export default class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.use("/product", new ProductModule().router);
    this.router.use("/customer", new customerModule().router);
    // this.router.use("/mpesa", new MpesaModule().router);
    // this.router.use("/application", new ApplicationModule().router);
    this.router.use("/order", new OrderModule().router);
    // this.router.use("/email/getintouch", new GetInTouchModule().router);
  }
}
