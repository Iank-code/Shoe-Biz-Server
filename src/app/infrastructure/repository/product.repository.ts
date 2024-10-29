import { resolve } from "path";
import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";

export default class ProductRepository {
  constructor() {}

  async getAll() {
    try {
      const allProducts = await db.product.findMany({});

      if (!allProducts || allProducts.length === 0) {
        return {
          status: 404,
          message: "No products found",
        };
      }

      return {
        data: allProducts.reverse(),
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 500,
        message: "An error occurred while fetching products.",
      };
    }
  }

  async addShoe(
    id: string,
    name: string,
    description: string,
    oldPrice: string,
    newPrice: string,
    imageUrl: string
  ) {
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

      const shoeSize: string[] = [
        "45",
        "44",
        "43",
        "42",
        "41",
        "40",
        "39",
        "38",
        "37",
        "36",
      ];

      const tag: string[] = ["Hottest", "New", "Men", "Women", "Kids"];

      await db.product.create({
        data: {
          name,
          description,
          oldPrice,
          newPrice,
          images: [imageUrl],
          tag,
          shoeSize,
        },
      });

      return {
        status: 201,
        message: `${name} created successfully`,
      };
    } catch (error) {
      Logger.error(error);
    }
  }

  async getById(id: string) {
    try {
      const product = await db.product.findFirst({
        where: { id: id },
        include: {
          colorVariants: {
            select: {
              color: true,
              price: true,
              image: true,
            }
          },
          sizeVariants: true,
          tags: true,
        },
      });
      if (!product) {
        return {
          status: 404,
          message: "No products found",
        };
      }
      console.log(id);
      return {
        data: product,
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

  async deleteProduct(id: string, productId: string) {
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

      await db.product.delete({
        where: { id: productId },
      });

      return {
        status: 201,
        message: "Product Deleted successfully",
      };
    } catch (error) {
      // Logger.error(error);
      return { error };
      // throw new Error("Error deleting product");
    }
  }
}
