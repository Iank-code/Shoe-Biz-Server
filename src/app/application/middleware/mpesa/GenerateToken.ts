import Logger from "../loggers/logger";
require("dotenv").config();
import axios from "axios";

const generateToken = async (req: any, res: any, next: any) => {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    );

    req.token = response.data.access_token;
    next();
  } catch (error) {
    Logger.error(error);
    res.status(400).json(error);
  }
};

export default generateToken;
