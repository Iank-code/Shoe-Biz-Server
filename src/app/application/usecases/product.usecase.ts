import ProductRepository from "../../infrastructure/repository/product.repository";

export default class ProductUsecase {
  repository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async getAll() {
    
    return await this.repository.getAll();
  }

  async deleteProduct(id: string, productId: string) {
    return await this.repository.deleteProduct(id, productId);
  }

  async getById(id: string) {
    return await this.repository.getById(id);
  }
  async getByTag(tag: any) {
    return await this.repository.getByTag(tag);
  }
}
