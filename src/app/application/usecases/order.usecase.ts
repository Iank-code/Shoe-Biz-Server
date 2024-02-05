import OrderRepository from "../../infrastructure/repository/order.repository";
import { orderType } from "../utils/helpers";

export default class OrderUsecase {
  repository;

  constructor() {
    this.repository = new OrderRepository();
  }

  async createOrder(customerId: string, productsInfo: orderType[]) {
    return await this.repository.createOrder(customerId, productsInfo);
  }

  async getOrders(uid: string) {
    return await this.repository.getOrders(uid);
  }

  async getOrderById(id: string) {
    return await this.repository.getOrderById(id);
  }
  async getByTag(tag: any) {
    return await this.repository.getByTag(tag);
  }
}
