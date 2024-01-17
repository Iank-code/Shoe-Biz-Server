import OrderRepository from "../../infrastructure/repository/order.repository";

export default class OrderUsecase {
  repository;

  constructor() {
    this.repository = new OrderRepository();
  }

  async createOrder(customerId: string, productsInfo: string, units: string) {
    return await this.repository.createOrder(customerId, productsInfo, units);
  }

  async getOrderById(id: string) {
    return await this.repository.getOrderById(id);
  }
  async getByTag(tag: any) {
    return await this.repository.getByTag(tag);
  }
}
