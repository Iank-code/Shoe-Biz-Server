import analyticRepository from "../../infrastructure/repository/analyticRepository";

export default class analyticUsecase {
  repository;

  constructor(){
    this.repository = new analyticRepository();
  }

  async userOrderAnalytics(id: string) {
    return await this.repository.userOrderAnalytics(id);
  }
}
