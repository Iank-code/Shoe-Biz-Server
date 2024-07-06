import Logger from "../../application/middleware/loggers/logger";
import { db } from "../services/database/client/db.client";
import { transporter } from "../../application/utils/helpers";
import axios from "axios";
require("dotenv").config();

import dotenv from "dotenv";
dotenv.config();
export default class MpesaRepository {
  constructor() {}

  async stk(payload: any, token: any) {
    try {
      // generating timestamp
      const date = new Date();
      const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

      const shortcode = process.env.MPESA_SHORTCODE;
      const passkey = process.env.MPESA_PASSKEY;

      const password = Buffer.from(shortcode! + passkey! + timestamp).toString(
        "base64"
      );

      await axios
        .post(
          process.env.STK_URL!,
          {
            // BusinessShortCode: shortcode,
            // Password: password,
            // Timestamp: timestamp,
            // TransactionType: "CustomerPayBillOnline",
            // Amount: "1", //payload.amount
            // PartyA: "254704412004",
            // PartyB: shortcode,
            // PhoneNumber: `254${payload.phoneNumber}`,
            // CallBackURL: "https://mydomain.com/pat",
            // AccountReference: "254704412004",
            // TransactionDesc: "This is just a test transaction",
            // },
            Initiator: "testapi",
            SecurityCredential:
              "WU7lu0UrBh+OzevEJ1jLHmVfjvGNrudIs7p5TSBZXF865IoIZJvxvop4IB8lEihiuh+ZrHHrjU2fHaDTokmLvWS/gpUaeOwm0dJp3VT/6IV+1By0915ILqufAxSQMi7F0Yel+nKWcyq6ugO3YIXeeZanjSFXplVbcczDFCd0C2IjfNw9LR2BGQwkh2Pc/EXsuWCNtm/8ieG+M1OKYMHBsoFfxo4mUh60peeELG+rdDc+FnrVpyggbftZyVe9q3Gkxq26Yu8p64mcmyBOz6tscJudQN0KVeZ5DiiFfuyTp34KB0dTn0Tifxp5uNek7OGqCL/EWuyYJ9IZDAVzl0PtkQ==",
            CommandID: "BusinessPayBill",
            SenderIdentifierType: "4",
            RecieverIdentifierType: 4,
            Amount: 239,
            // PartyA: process.env.PARTY_A,
            // PartyB: process.env.PARTY_B,
            PartyA: "254704412004",
            PartyB: shortcode,
            AccountReference: "0704412004",//process.env.BANK_ACC, //bank account nummber
            Requester: 254704412004,
            Remarks: "Testing this paybill api",
            QueueTimeOutURL: "https://mydomain.com/b2b/queue/",
            ResultURL: "https://mydomain.com/b2b/result/",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          console.log(data);
          return {
            status: 201,
            data: data,
            message: "Mpesa works.",
          };
        });
    } catch (error) {
      Logger.error(error);
    }
  }
}
