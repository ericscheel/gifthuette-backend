import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  // Admin
  const adminHash = await argon2.hash("Admin123!");
  await prisma.user.upsert({
    where: { email: "admin@gifthuette.local" },
    update: {},
    create: {
      email: "admin@gifthuette.local",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });

  // Kategorie
  const cat = await prisma.category.upsert({
    where: { slug: "geschenke" },
    update: {},
    create: { slug: "geschenke", name: "Geschenke" },
  });

  // Produkte
  await prisma.product.upsert({
    where: { slug: "tasse-gifthuette" },
    update: {},
    create: {
      slug: "tasse-gifthuette",
      name: "Gifthütten-Tasse",
      priceCents: 1299,
      stock: 50,
      categoryId: cat.id,
    },
  });
  await prisma.product.upsert({
    where: { slug: "beanie-gifthuette" },
    update: {},
    create: {
      slug: "beanie-gifthuette",
      name: "Gifthütten-Beanie",
      priceCents: 2499,
      stock: 30,
      categoryId: cat.id,
    },
  });
}

main()
  .then(() => console.log("Seed fertig."))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
