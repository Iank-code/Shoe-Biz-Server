import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";
import { transporter } from "../../application/utils/helpers";
import bcrypt from "bcrypt";
import path from "path";
import ejs from "ejs";
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
import { comparePasswords } from "../../application/utils/helpers";

import dotenv from "dotenv";
dotenv.config();

const notFound = {
  status: 404,
  message: "Either email address or password is incorrect",
};
export default class sellerRepository {
  constructor() {}

  async registerSeller(payload: any) {
    try {
      if (payload.password !== payload.password_confirmation) {
        console.log(payload);
        return {
          status: 422,
          message: "Password do not match",
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = bcrypt.hashSync(payload.password, salt);

      const customer = await db.seller.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: hashed,
        },
      });

      const filePath = path.join(
        __dirname,
        "../../../app/presentation/templates/email/customer/registration.ejs"
      );

      let html = await ejs.renderFile(filePath, {
        email: customer.email,
        name: customer.name,
      });

      const info = await transporter.sendMail({
        from: process.env.GMAIL_NAME,
        to: customer.email,
        subject: `Confirm your email`,
        text: `Hello ${customer.name}`,
        html: html,
      });

      Logger.info("Message sent: %s", info);

      return {
        status: 200,
        message:
          "Account has been created successfully. A verification email has been sent to your email address.",
        customer,
      };
    } catch (error) {
      Logger.error(error);
    }
  }

  async loginSeller(payload: any) {
    try {
      const user = await db.seller.findFirst({
        where: { email: payload.email },
      });

      if (!user) {
        return notFound;
      }

      const passwordMatch = await comparePasswords({
        password: payload.password,
        encrypted: user!.password,
      });

      if (!passwordMatch) {
        return notFound;
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SEC,
        { expiresIn: "12h" }
      );

      const { password, otp, confirmedEmail, id, ...others } = user;

      return {
        status: 200,
        message: "Login successful",
        data: {
          user: others,
          access_token: accessToken,
          // refresh_token: refreshToken,
        },
      };
    } catch (error) {
      Logger.error(error);
    }
  }
  async sellerProfile(id: string) {
    try {
      const user = await db.seller.findFirst({
        where: { id },
      });

      if (!user) {
        return {
          status: 404,
          message: "Customer not found",
        };
      } else if (user.role !== "Seller") {
        return {
          status: 404,
          message: "Unauthorized",
        };
      }

      const { password, otp, confirmedEmail, ...others } = user;

      return {
        user: others,
        status: 200,
        message: "User profile found",
      };
    } catch (error) {
      Logger.error(error);
    }
  }

  async updateSeller(id: string, payload: any) {
    try {
      const user = await db.seller.findFirst({
        where: { id },
      });

      if (!user) {
        return {
          status: 404,
          message: "Customer not found",
        };
      }

      const { password, name, phoneNumber } = payload;
      const salt = await bcrypt.genSalt(10);
      const hashed = bcrypt.hashSync(password, salt);

      const update = await db.seller.update({
        where: { id: id },
        data: { name, phoneNumber, password: hashed },
      });

      console.log(update);

      return {
        status: 200,
        user: update,
      };
    } catch (error) {
      Logger.error(error);
    }
  }
}
