import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin123*", 12);

  await prisma.$executeRaw`
    INSERT INTO "public"."User" (
      id,
      username,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      role,
      status,
      "failedLoginAttempts",
      "createdAt",
      "updatedAt"
    )
    VALUES (
      ${randomUUID()},
      'admin',
      'admin@flordetamboril.com',
      ${passwordHash},
      'Administrador',
      'Principal',
      'ADMIN'::"public"."UserRole",
      'ACTIVE'::"public"."UserStatus",
      0,
      NOW(),
      NOW()
    )
    ON CONFLICT (username)
    DO UPDATE SET
      email = EXCLUDED.email,
      "passwordHash" = EXCLUDED."passwordHash",
      "firstName" = EXCLUDED."firstName",
      "lastName" = EXCLUDED."lastName",
      role = EXCLUDED.role,
      status = EXCLUDED.status,
      "failedLoginAttempts" = 0,
      "lockedUntil" = NULL,
      "updatedAt" = NOW()
  `;

  console.log("Administrador seed creado o actualizado.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
