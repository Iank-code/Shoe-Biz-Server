import { runServer } from "./app/application/bin/server";
import Logger from "./app/application/middleware/loggers/logger";
import dotenv from "dotenv";
dotenv.config();

export const main = () => {
  const port = process.env.PORT;
  const host = process.env.SERVER_URL;

  const { app } = runServer();

  app.listen(port, () => {
    Logger.debug("Server started");
    Logger.info(`Running on 👉🏼 ${host}:${port} `);
  });
};

main();
