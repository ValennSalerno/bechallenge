import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { username: 'Valen', password: 'valen', role: 'user', usedMB: 0, uploadedF: 0 },
      { username: 'Sirius', password: 'sirius.example.com', role: 'admin', usedMB: 0, uploadedF: 0 },
      { username: 'Lucas', password: 'backendgod', role: 'admin', usedMB: 0, uploadedF: 0 },
      { username: 'Tincho', password: 'tincho.example.com', role: 'user', usedMB: 0, uploadedF: 0 },
      { username: 'Chona', password: 'chona.example.com', role: 'user', usedMB: 0, uploadedF: 0 },
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