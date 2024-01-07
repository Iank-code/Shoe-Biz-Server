import CustomerRepository from "../../infrastructure/repository/customer.repository";

export default class CustomerUsecase {
  repository;

  constructor() {
    this.repository = new CustomerRepository();
  }
  async registerCustomer(payload: any) {
    return await this.repository.registerCustomer(payload);
  }

  async loginAdmin(payload: any) {
    // return await this.repository.loginAdmin(payload);
  }

  async getMessageById(payload: any) {
    // return await this.repository.getMessageById(payload);
  }
  async deleteMessage(id: string) {
    // return await this.repository.deleteMessage(id);
  }
}
