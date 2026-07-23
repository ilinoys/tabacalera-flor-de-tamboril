import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import type { SessionUserRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

type UserStatus = "ACTIVE" | "INACTIVE" | "LOCKED";

type UserRecord = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: SessionUserRole;
  status: UserStatus;
  lastLogin: Date | null;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
};

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: SessionUserRole;
  status: UserStatus;
  lastLogin: string | null;
};

type LoginResult =
  | {
      ok: true;
      user: AuthUser;
    }
  | {
      ok: false;
      status: number;
      error: string;
    };

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

function toAuthUser(user: UserRecord): AuthUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    lastLogin: user.lastLogin?.toISOString() ?? null,
  };
}

async function findUserByIdentifier(identifier: string) {
  const users = await prisma.$queryRaw<UserRecord[]>`
    SELECT
      id,
      username,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      role,
      status,
      "lastLogin",
      "failedLoginAttempts",
      "lockedUntil"
    FROM "public"."User"
    WHERE lower(username) = lower(${identifier})
      OR lower(email) = lower(${identifier})
    LIMIT 1
  `;

  return users[0] ?? null;
}

export async function authenticateUser(
  identifier: string,
  password: string
): Promise<LoginResult> {
  const user = await findUserByIdentifier(identifier);

  if (!user) {
    return {
      ok: false,
      status: 401,
      error: "Credenciales invalidas.",
    };
  }

  const now = new Date();

  if (user.lockedUntil && user.lockedUntil > now) {
    return {
      ok: false,
      status: 423,
      error: "Usuario bloqueado temporalmente. Intenta mas tarde.",
    };
  }

  if (user.status !== "ACTIVE") {
    return {
      ok: false,
      status: 403,
      error: "Usuario inactivo o bloqueado.",
    };
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    const attempts = user.failedLoginAttempts + 1;
    const lockedUntil =
      attempts >= MAX_FAILED_ATTEMPTS
        ? new Date(Date.now() + LOCK_DURATION_MS)
        : null;

    await prisma.$executeRaw`
      UPDATE "public"."User"
      SET
        "failedLoginAttempts" = ${attempts},
        "lockedUntil" = ${lockedUntil},
        status = ${
          lockedUntil ? "LOCKED" : user.status
        }::"public"."UserStatus",
        "updatedAt" = NOW()
      WHERE id = ${user.id}
    `;

    return {
      ok: false,
      status: 401,
      error: "Credenciales invalidas.",
    };
  }

  await prisma.$executeRaw`
    UPDATE "public"."User"
    SET
      "lastLogin" = NOW(),
      "failedLoginAttempts" = 0,
      "lockedUntil" = NULL,
      status = 'ACTIVE'::"public"."UserStatus",
      "updatedAt" = NOW()
    WHERE id = ${user.id}
  `;

  return {
    ok: true,
    user: toAuthUser({
      ...user,
      status: "ACTIVE",
      lastLogin: now,
      failedLoginAttempts: 0,
      lockedUntil: null,
    }),
  };
}

export async function getUserById(userId: string) {
  const users = await prisma.$queryRaw<UserRecord[]>`
    SELECT
      id,
      username,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      role,
      status,
      "lastLogin",
      "failedLoginAttempts",
      "lockedUntil"
    FROM "public"."User"
    WHERE id = ${userId}
    LIMIT 1
  `;
  const user = users[0];

  if (!user || user.status !== "ACTIVE") {
    return null;
  }

  return toAuthUser(user);
}

export async function upsertAdminUser() {
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
}
