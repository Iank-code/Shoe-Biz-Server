import { Request, Response } from "express";
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateRequest = () => {
  return async (req: any, res: Response, next: any) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json("You are not authenticated!");
      }
      const token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.JWT_SEC!,
        (err: any, user: { id: string; email: string }) => {
          if (err)
            return res.status(403).json("Token has expired. Login to proceed");

          req.user = user;
          next();
        }
      );
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: {
          message: "Authentication failed. Login in again to proceed",
        },
      });
    }
  };
};

export default authenticateRequest;
