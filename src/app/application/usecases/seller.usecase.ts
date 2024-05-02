import sellerRepository from "../../infrastructure/repository/seller.repository";

export default class sellerUsecase {
  repository;

  constructor() {
    this.repository = new sellerRepository();
  }
  async registerSeller(payload: any) {
    return await this.repository.registerSeller(payload);
  }

  async loginSeller(payload: any) {
    return await this.repository.loginSeller(payload);
  }

  async sellerProfile(id: any) {
    return await this.repository.sellerProfile(id);
  }
  async updateSeller(id: string, payload: any) {
    return await this.repository.updateSeller(id, payload);
  }
}
