import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";
import { transporter } from "../../application/utils/helpers";
import path from "path";
import ejs from "ejs";

export default class NewsLetterRepository {
  async registerInterest(email: string) {
    try {
      const registeredEmail = await db.newsletter.create({
        data: { email },
      });

      return {
        status: 201,
        message: "Thank you for joining us. We will be in touch.",
        data: registeredEmail,
      };
    } catch (error) {
      Logger.error(error);
    }
  }
}
