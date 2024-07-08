import { Response, Router } from "express";
import generateToken from "../../../application/middleware/mpesa/GenerateToken";
import MpesaUsecase from "../../../application/usecases/mpesa.usecase";

const usecase: MpesaUsecase = new MpesaUsecase();

export default class MpesaModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/stk", generateToken, this.stk);
  }

  private async stk(req: any, res: Response) {
    const payload = req.body;
    const token = req.token;
    const response = await usecase.stk(payload, token);
    return res.send(response);
  }
}
