import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import { DEFAULT_SITE_CONTENT } from '../src/content/default-content';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  // --- Admin account ---------------------------------------------------------
  const username = process.env.SEED_ADMIN_USERNAME ?? 'superadmin';
  const email = (process.env.SEED_ADMIN_EMAIL ?? 'admin@farafina-cb.com').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'Farafina2026!';
  const name = process.env.SEED_ADMIN_NAME ?? 'Farafina Admin';
  const hashed = await bcrypt.hash(password, 10);

  const existing = await prisma.admin.findFirst();
  if (existing) {
    await prisma.admin.update({
      where: { id: existing.id },
      data: { username, name },
    });
  } else {
    await prisma.admin.create({
      data: { username, email, password: hashed, name },
    });
  }
  console.log(`Admin ready: ${username}`);

  // --- Default site content --------------------------------------------------
  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, data: DEFAULT_SITE_CONTENT as object },
  });
  console.log('Site content seeded.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
