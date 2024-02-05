import { Request, Response, Router } from "express";
import NewsLetterUsecase from "../../../application/usecases/newsLetter.usecase";

const usecase: NewsLetterUsecase = new NewsLetterUsecase();

export default class NewsLetterModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/register", this.registerInterest);
  }

  private async registerInterest(req: Request, res: Response) {
    const { email } = req.body;
    const response = await usecase.registerInterest(email);
    return res.send(response);
  }
}
