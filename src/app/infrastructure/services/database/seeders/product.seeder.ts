import Logger from "../../../../application/middleware/loggers/logger";
import { db } from "../client/db.client";
import { faker } from "@faker-js/faker";

const productSeeder = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      await db.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          oldPrice: faker.commerce.price({ min: 4500, max: 6500, dec: 0 }),
          newPrice: faker.commerce.price({ min: 1500, max: 4000, dec: 0 }),
          shoeSize: ["45", "44", "43", "42", "41", "40", "39"],
          images: [
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
          ],
          tag: ["Hottest", "New", "Men", "Women", "Kids"],
        },
      });
    }
  } catch (error) {
    Logger.error(error);
  }
};

export default productSeeder;

// import Logger from "../../../../application/middleware/loggers/logger";
// import { db } from "../client/db.client";
// import { faker } from "@faker-js/faker";

// const productSeeder = async () => {
//   try {
//     await db.product.create({
//       data: {
//         name: faker.commerce.productName(),

//         description: faker.commerce.productDescription(),

//         oldPrice: faker.commerce.price({ min: 4500, max: 6500, dec: 0 }),

//         newPrice: faker.commerce.price({ min: 1500, max: 4000, dec: 0 }),

//         shoeSize: ["45", "44", "43", "42", "41", "40", "39"],

//         images: [
//           faker.image.url(),
//           faker.image.url(),
//           faker.image.url(),
//           faker.image.url(),
//           faker.image.url(),
//           faker.image.url(),
//           faker.image.url(),
//         ],

//         tag: ["Hottest", "New", "Men", "Women", "Kids"],
//       },
//     });
//   } catch (error) {
//     Logger.error(error);
//   }
// };

// export default productSeeder;
