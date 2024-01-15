import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";

export default class OrderRepository {
  constructor() {}

  //   async createOrder(customerId: string, productsInfo: string) {
  //     try {

  //         const product = await db.product.findFirst({
  //           where: { id: productsInfo },
  //         });
  //       const order = await db.order.create({
  //         data: {
  //           create: {
  //             customerId: customerId,
  //             productsInfo: product,
  //           },
  //         },
  //       });
  //     } catch (error) {
  //       Logger.error(error);
  //     }
  //   }

  async createOrder(customerId: string, productsInfo: string) {
    try {
      const product = await db.product.findFirst({
        where: { id: productsInfo },
      });

      if (!product) {
        // Handle the case where the product with the specified id is not found
        throw new Error("Product not found");
      }

      const order = await db.order.create({
        data: {
          user: {
            connect: { id: customerId },
          },
          productsInfo: {
            connect: { id: product.id },
          },
        },
      });

      return { order };
    } catch (error) {
      Logger.error(error);
      //   throw new Error("Failed to create order");
    }
  }

  async getOrderById(id: string) {
    try {
      const order = await db.order.findFirst({
        where: { id: id },
        include: {
          productsInfo: true,
          user: true
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
