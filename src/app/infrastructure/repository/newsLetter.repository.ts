import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";
import { transporter } from "../../application/utils/helpers";
import path from "path";
import ejs from "ejs";

export default class NewsLetterRepository {
  async registerInterest(email: string) {
    try {
        
    } catch (error) {
      Logger.error(error);
    }
  }
}
