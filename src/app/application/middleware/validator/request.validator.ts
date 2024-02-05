import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

import { db } from "../../../infrastructure/services/database/client/db.client";

import { Customer } from "@prisma/client";
import { ServerResponse, ValidationError } from "../../../../../types";

const validateRequest = (schema: yup.AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    } catch (err: any) {
      const error: ServerResponse<ValidationError> = {
        status: 422,
        message: "Validation failed for one or more fields",
        // data: {
        //   title: "One or more fields are not valid",
        //   message: err?.message,
        //   details: err.inner.map((errorItem: any) => {
        //     const f: string = errorItem.path as string;
        //     const m: string = errorItem.message as string;
        //     return {
        //       field: f,
        //       message: m,
        //     };
        //   }),
        // },
      };

      return res.status(error.status).json(error.data);
    }
  };
};
