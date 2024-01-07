# Ian-corporation-server

After cloning, you need to generate prisma .
Use the following command

        npx prisma migrate dev --schema=./src/app/infrastructure/services/database/prisma/schema.prisma
        
        npx prisma generate --schema=./src/app/infrastructure/services/database/prisma/schema.prisma

        npm run prisma

Seed the database

        npm run prisma:seed
# Shoe-Biz-Server
