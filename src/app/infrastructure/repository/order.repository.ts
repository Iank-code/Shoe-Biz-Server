import Logger from "../../application/middleware/loggers/logger";
import { orderType } from "../../application/utils/helpers";
import { db } from "../services/database/client/db.client";

export default class OrderRepository {
  constructor() {}

  async createOrder(customerId: string, productInfo: orderType[]) {
    try {
      const customer = await db.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        throw new Error("Customer not found");
      }

      await db.order.create({
        data: {
          user: {
            connect: { id: customerId },
          },
          customerOrderInfo: {
            create: productInfo.map((info) => {
              return {
                shoeSize: info.size,
                units: info.quantity.toString(),
                productsInfo: {
                  connect: { id: info.product.id },
                },
              };
            }),
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

      return {
        status: 201,
        message: "Success. Order has been created successfully",
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getOrders(uid: string) {
    try {
      const orders = await db.order.findMany({
        where: { customerId: uid },
        include: {
          customerOrderInfo: {
            include: {
              productsInfo: true,
            },
          },
        },
      });

      if (!orders) {
        return {
          status: 404,
          message: "orders not found",
        };
      }

      return {
        orders,
      };
    } catch (error) {
      Logger.error(error);
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
