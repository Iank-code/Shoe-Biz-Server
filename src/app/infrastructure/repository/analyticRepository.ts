import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";

export default class analyticRepository {
  async userOrderAnalytics(id: string) {
    try {
      const admin = await db.seller.findFirst({
        where: { id },
      });

      if (admin!.role !== "Seller") {
        return {
          status: 401,
          message: "Unauthorized access",
        };
      }

      const getAllCustomers = await db.customer.findMany();
      const getAllOrders = await db.order.findMany();
      const getAllProducts = await db.product.findMany();

      return {
        status: 200,
        message: "Request successful",
        customers: getAllCustomers.length,
        orders: getAllOrders.length,
        products: getAllProducts.length,
      };
    } catch (error) {
      Logger.error(error);
    }
  }
}
