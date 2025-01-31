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
      };
    } catch (error) {
      Logger.error(error);
    }
  }

  async loginCustomer(payload: any) {
    try {
      const user = await db.customer.findFirst({
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
        },
        process.env.JWT_SEC,
        { expiresIn: "12h" }
      );

      const { password, otp, emailConfirmedAt, id, ...others } = user;

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
  async customerProfile(id: string) {
    try {
      const user = await db.customer.findFirst({
        where: { id },
      });

      if (!user) {
        return {
          status: 404,
          message: "Customer not found",
        };
      }

      const { password, otp, emailConfirmedAt, ...others } = user;

      return {
        user: others,
        status: 200,
        message: "User profile found",
      };
    } catch (error) {
      Logger.error(error);
    }
  }

  async updateCustomer(id: string, payload: any) {
    try {
      const user = await db.customer.findFirst({
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

      const update = await db.customer.update({
        where: { id: id },
        data: { name, phoneNumber, password: hashed },
      });

      return {
        status: 200,
        user: update,
      };
    } catch (error) {
      Logger.error(error);
    }
  }

  async logoutUser(token: string) {
    try {
      const existingToken = await db.blacklistedToken.findUnique({
        where: { token },
      });

      if (existingToken) {
        return { message: "User is already logged out." };
      }

      await db.blacklistedToken.create({
        data: {
          token,
        },
      });

      return { status: 200, message: "User logged out successfully." };
    } catch (error) {
      Logger.error(error);
    }
  }
}
