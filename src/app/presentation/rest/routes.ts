import { Router } from "express";
// import CourseModule from "./modules/course.module";
// import ApplicationModule from "./modules/application.module";
// import GetInTouchModule from "./modules/GetInTouch.module";
// import ContactModule from "./modules/contact.module";
import customerModule from "./modules/customer.module";
// import MpesaModule from "./modules/mpesa.module";

export default class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    // this.router.use("/course", new CourseModule().router);
    this.router.use("/customer", new customerModule().router);
    // this.router.use("/mpesa", new MpesaModule().router);
    // this.router.use("/application", new ApplicationModule().router);
    // this.router.use("/contact", new ContactModule().router);
    // this.router.use("/email/getintouch", new GetInTouchModule().router);
  }
}
