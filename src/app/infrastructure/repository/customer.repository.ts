export default class CustomerRepository {
  constructor() {}

  async registerCustomer(payload: any) {
    return {
      status: 200,
      message: "Route registered successfully",
    };
  }
}
