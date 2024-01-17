import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";

export default class OrderRepository {
  constructor() {}

  async createOrder(customerId: string, productId: string, units: string) {
    try {
      const product = await db.product.findFirst({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Product not found");
      }


      const order = await db.order.create({
        data: {
          user: {
            connect: { id: customerId },
          },
          customerOrderInfo: {
            create: {
              shoeSize: "40", // Replace with the actual shoe size logic
              units: units,
              productsInfo: {
                connect: { id: productId },
              },
            },
          },
        },
        include: {
          customerOrderInfo: {
            include: {
              productsInfo: true,
            },
          },
        },
      });

      return { order };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create order");
    }
  }

  async getOrderById(id: string) {
    try {
      const order = await db.order.findFirst({
        where: { id: id },
        include: {
          customerOrderInfo: true,
          user: true,
        },
      });
      if (!order) {
        return {
          status: 404,
          message: "No products found",
        };
      }
      return {
        data: order,
      };
    } catch (error) {
      Logger.error(error);
    }
  }
  async getByTag(tag: string) {
    try {
      const products = await db.product.findMany({
        where: {
          tag: {
            has: tag,
          },
        },
      });

      if (!products) {
        return {
          status: 404,
          message: `Products with tag ${tag} not found`,
        };
      }

      return {
        data: products,
      };
    } catch (error) {
      Logger.error(error);
      throw new Error("Error fetching products by tag");
    }
  }
}
