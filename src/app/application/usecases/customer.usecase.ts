import CustomerRepository from "../../infrastructure/repository/customer.repository";

export default class CustomerUsecase {
  repository;

  constructor() {
    this.repository = new CustomerRepository();
  }
  async registerCustomer(payload: any) {
    return await this.repository.registerCustomer(payload);
  }

  async loginCustomer(payload: any) {
    return await this.repository.loginCustomer(payload);
  }

  async customerProfile(id: any) {
    return await this.repository.customerProfile(id);
  }
  async updateCustomer(id: string, payload: any) {
    return await this.repository.updateCustomer(id, payload);
  }
}
