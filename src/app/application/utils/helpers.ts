import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { PasswordCompareInput } from "../../../../types";
dotenv.config();

/**
 * Helps to configure cors options based on the allowed domains
 * that are passed on through the environment variables
 * @returns
 */
const createCorsOptions = (): cors.CorsOptions => {
  const allowedDomains = process.env.ALLOWED_DOMAINS ?? "*";
  const domains = allowedDomains.split(";").join(",");

  const corsOptions: cors.CorsOptions = {
    origin: domains,
  };
  return corsOptions;
};

// For sending email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_NAME,
    pass: process.env.GMAIL_PASS,
  },
});

const comparePasswords = async (
  input: PasswordCompareInput
): Promise<boolean> => {
  const result = await bcrypt.compare(input.password, input.encrypted);
  return result;
};

interface productsTypes {
  id: string;
}
export interface orderType {
  product: productsTypes;
  quantity: number;
  size: string;
}
export {
  comparePasswords,
  //   generateSecurePasswords,
  createCorsOptions,
  transporter,
  //   generateRandomString,
  //   formatAudioName,
};
