import ProductRepository from "../../infrastructure/repository/product.repository";

export default class ProductUsecase {
  repository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async getAll() {
    return await this.repository.getAll();
  }
}
