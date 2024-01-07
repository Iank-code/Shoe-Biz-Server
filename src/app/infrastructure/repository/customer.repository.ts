import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";
import { transporter } from "../../application/utils/helpers";
import bcrypt from "bcrypt";
import path from "path";
import ejs from "ejs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export default class CustomerRepository {
  constructor() {}

  async registerCustomer(payload: any) {
    try {
      if (payload.password !== payload.password_confirmation) {
        return {
          status: 422,
          message: "Password do not match",
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = bcrypt.hashSync(payload.password, salt);

      const customer = await db.customer.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: hashed,
        },
      });
      return {
        status: 200,
        message: "Account has been created successfully. Login to proceed.",
      };
    } catch (error) {
      Logger.error(error);
    }
  }
}
