import NewsLetterRepository from "../../infrastructure/repository/newsLetter.repository";

export default class NewsLetterUsecase {
  repository;

  constructor() {
    this.repository = new NewsLetterRepository();
  }

  async registerInterest(email: string) {
    return await this.repository.registerInterest(email);
  }
}
