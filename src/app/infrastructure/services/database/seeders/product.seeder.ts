import Logger from "../../../../application/middleware/loggers/logger";
import { db } from "../client/db.client";
import { faker } from "@faker-js/faker";

const productSeeder = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      // Create product with its tags
      const product = await db.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          oldPrice: faker.commerce.price({ min: 4500, max: 6500, dec: 0 }),
          newPrice: faker.commerce.price({ min: 1500, max: 4000, dec: 0 }),
          shoeSize: [
            "45",
            "44",
            "43",
            "42",
            "41",
            "40",
            "39",
            "38",
            "37",
            "36",
          ],
          images: [
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
          ],
          tags: {
            connectOrCreate: [
              { where: { name: "Hottest" }, create: { name: "Hottest" } },
              { where: { name: "New" }, create: { name: "New" } },
              { where: { name: "Men" }, create: { name: "Men" } },
              { where: { name: "Women" }, create: { name: "Women" } },
              { where: { name: "Kids" }, create: { name: "Kids" } },
            ],
          },
        },
      });

      // Add color variants to the product
      const colorOptions = ["Red", "Blue", "Black", "White", "Green"];
      for (const color of colorOptions) {
        await db.colorVariant.create({
          data: {
            color,
            image: faker.image.url(),
            price: faker.commerce.price({ min: 1500, max: 4000, dec: 0 }),
            productId: product.id,
          },
        });
      }

      // Add size variants to the product
      const sizeOptions = ["XS", "S", "M", "L", "XL"];
      for (const size of sizeOptions) {
        await db.sizeVariant.create({
          data: {
            size,
            productId: product.id,
          },
        });
      }
    }
    Logger.info("Products seeded successfully!");
  } catch (error) {
    Logger.error(error);
  }
};

export default productSeeder;