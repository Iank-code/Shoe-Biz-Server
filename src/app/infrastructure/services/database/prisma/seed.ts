import Logger from "../../../../application/middleware/loggers/logger";
import { db } from "../client/db.client";
import productSeeder from "../seeders/product.seeder";


async function main() {
  await productSeeder();
}
main()
  .then(async () => {
    await db.$disconnect();
    Logger.info("All seeders have been run successfully");
  })
  .catch(async (e) => {
    Logger.error(e);
    await db.$disconnect();
    process.exit(1);
  });
