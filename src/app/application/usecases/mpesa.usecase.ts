import MpesaRepository from "../../infrastructure/repository/mpesa.repository";

export default class MpesaUsecase {
  repository;

  constructor() {
    this.repository = new MpesaRepository();
  }
  async stk(payload: any, token: any) {
    return await this.repository.stk(payload, token);
  }
}
