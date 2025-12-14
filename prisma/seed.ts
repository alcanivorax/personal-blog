import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!username || !plainPassword) {
    throw new Error("❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in env");
  }

  const passwordHash = await bcrypt.hash(plainPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { username },
    update: {},
    create: {
      username,
      passwordHash,
    },
  });

  console.log("✅ Admin seeded:", admin.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
