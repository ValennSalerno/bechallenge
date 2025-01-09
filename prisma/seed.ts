import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { username: 'Valen', password: 'valen', role: 'user' },
      { username: 'Sirius', password: 'sirius.example.com', role: 'admin' },
      { username: 'Lucas', password: 'backendgod', role: 'admin' },
      { username: 'Tincho', password: 'tincho.example.com', role: 'user' },
      { username: 'Chona', password: 'chona.example.com', role: 'user' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });