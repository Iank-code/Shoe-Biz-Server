import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";

export default class ProductRepository {
  constructor() {}

  async getAll() {
    try {
      const allProducts = await db.product.findMany();

      if(!allProducts){
        return{
            status: 404,
            message: "No products found"
        }
      }

      return{
        data: allProducts
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}
