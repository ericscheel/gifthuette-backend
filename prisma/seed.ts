// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Admin-User
  const adminHash = await argon2.hash('Admin123!');
  await prisma.user.upsert({
    where: { email: 'admin@gifthuette.local' },
    update: {},
    create: {
      email: 'admin@gifthuette.local',
      passwordHash: adminHash,
      role: 'ADMIN',
    },
  });

  // Kategorien
  const cocktails = await prisma.category.upsert({
    where: { slug: 'cocktails' },
    update: {},
    create: { slug: 'cocktails', name: 'Cocktails' },
  });

  const alkoholfrei = await prisma.category.upsert({
    where: { slug: 'alkoholfrei' },
    update: {},
    create: { slug: 'alkoholfrei', name: 'Alkoholfrei' },
  });

  // Drinks
  const mojito = await prisma.drink.upsert({
    where: { slug: 'mojito' },
    update: {},
    create: {
      slug: 'mojito',
      name: 'Mojito',
      description: 'Rum, Limette, Minze, Soda',
      priceCents: 900,
      categoryId: cocktails.id,
      active: true,
      media: {
        create: [{ url: 'https://example.com/mojito.jpg', alt: 'Mojito' }],
      },
    },
  });

  await prisma.drinkVariant.createMany({
    data: [
      { drinkId: mojito.id, label: '0,3l', priceCents: 900 },
      { drinkId: mojito.id, label: '0,5l', priceCents: 1200 },
    ],
    skipDuplicates: true,
  });

  const virginCola = await prisma.drink.upsert({
    where: { slug: 'virgin-cola' },
    update: {},
    create: {
      slug: 'virgin-cola',
      name: 'Cola',
      description: 'Eiskalt, ohne Alkohol',
      priceCents: 300,
      categoryId: alkoholfrei.id,
      active: true,
    },
  });

  await prisma.drinkVariant.createMany({
    data: [
      { drinkId: virginCola.id, label: '0,3l', priceCents: 300 },
      { drinkId: virginCola.id, label: '0,5l', priceCents: 400 },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed fertig.');
}

main()
  .catch((e) => {
    console.error('❌ Seed Fehler:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
