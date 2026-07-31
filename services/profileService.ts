import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import type { AuthUser } from "@/services/authService";

type ProfileRecord = AuthUser & {
  profileImage: string | null;
  createdAt: Date;
  passwordHash: string;
};

export type UserProfile = Omit<ProfileRecord, "passwordHash">;

type UpdateProfileInput = {
  firstName: string;
  lastName: string;
  profileImage?: string | null;
};

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

function toUserProfile(user: ProfileRecord): UserProfile {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
    role: user.role,
    status: user.status,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
  };
}

export async function getUserProfile(userId: string) {
  const users = await prisma.$queryRaw<ProfileRecord[]>`
    SELECT
      id,
      username,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      "profileImage",
      role,
      status,
      "lastLogin",
      "createdAt"
    FROM "public"."User"
    WHERE id = ${userId}
    LIMIT 1
  `;
  const user = users[0];

  if (!user || user.status !== "ACTIVE") {
    return null;
  }

  return toUserProfile(user);
}

export async function updateUserProfile(
  userId: string,
  input: UpdateProfileInput
) {
  const users = await prisma.$queryRaw<ProfileRecord[]>`
    UPDATE "public"."User"
    SET
      "firstName" = ${input.firstName},
      "lastName" = ${input.lastName},
      "profileImage" = ${input.profileImage ?? null},
      "updatedAt" = NOW()
    WHERE id = ${userId}
    RETURNING
      id,
      username,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      "profileImage",
      role,
      status,
      "lastLogin",
      "createdAt"
  `;
  const user = users[0];

  if (!user || user.status !== "ACTIVE") {
    return null;
  }

  return toUserProfile(user);
}

export async function changeUserPassword(
  userId: string,
  input: ChangePasswordInput
) {
  const users = await prisma.$queryRaw<ProfileRecord[]>`
    SELECT
      id,
      username,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      "profileImage",
      role,
      status,
      "lastLogin",
      "createdAt"
    FROM "public"."User"
    WHERE id = ${userId}
    LIMIT 1
  `;
  const user = users[0];

  if (!user || user.status !== "ACTIVE") {
    return {
      ok: false,
      status: 404,
      error: "No se encontro el usuario autenticado.",
    };
  }

  const currentPasswordMatches = await bcrypt.compare(
    input.currentPassword,
    user.passwordHash
  );

  if (!currentPasswordMatches) {
    return {
      ok: false,
      status: 400,
      error: "La contrasena actual no es correcta.",
    };
  }

  const passwordHash = await bcrypt.hash(input.newPassword, 12);

  await prisma.$executeRaw`
    UPDATE "public"."User"
    SET
      "passwordHash" = ${passwordHash},
      "updatedAt" = NOW()
    WHERE id = ${userId}
  `;

  return {
    ok: true,
  };
}
