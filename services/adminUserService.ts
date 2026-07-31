import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import type { SessionPayload, SessionUserRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export type ManagedUserStatus = "ACTIVE" | "INACTIVE" | "LOCKED";

export type ManagedUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: SessionUserRole;
  status: ManagedUserStatus;
  lastLogin: string | null;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserListParams = {
  search?: string;
  role?: SessionUserRole | "ALL";
  status?: ManagedUserStatus | "ALL";
  sortBy?: "name" | "username" | "email" | "role" | "status" | "createdAt";
  sortDirection?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: SessionUserRole;
  status: ManagedUserStatus;
};

export type UpdateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  role: SessionUserRole;
  status: ManagedUserStatus;
};

type UserRecord = Omit<
  ManagedUser,
  "lastLogin" | "lockedUntil" | "createdAt" | "updatedAt"
> & {
  lastLogin: Date | null;
  lockedUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const SORT_COLUMNS: Record<
  NonNullable<UserListParams["sortBy"]>,
  string
> = {
  name: `"firstName"`,
  username: "username",
  email: "email",
  role: "role",
  status: "status",
  createdAt: `"createdAt"`,
};

function toManagedUser(user: UserRecord): ManagedUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    lastLogin: user.lastLogin?.toISOString() ?? null,
    failedLoginAttempts: user.failedLoginAttempts,
    lockedUntil: user.lockedUntil?.toISOString() ?? null,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export function assertAdminSession(session: SessionPayload | null) {
  if (!session) {
    return {
      ok: false as const,
      status: 401,
      error: "No autenticado.",
    };
  }

  if (session.role !== "ADMIN") {
    return {
      ok: false as const,
      status: 403,
      error: "No tienes permiso para administrar usuarios.",
    };
  }

  return {
    ok: true as const,
    session,
  };
}

export async function listUsers(params: UserListParams) {
  const search = params.search?.trim() ?? "";
  const role = params.role && params.role !== "ALL" ? params.role : null;
  const status =
    params.status && params.status !== "ALL" ? params.status : null;
  const sortBy = params.sortBy ?? "createdAt";
  const sortDirection = params.sortDirection === "asc" ? "ASC" : "DESC";
  const page = Math.max(params.page ?? 1, 1);
  const pageSize = Math.min(Math.max(params.pageSize ?? 10, 5), 50);
  const offset = (page - 1) * pageSize;
  const sortColumn = SORT_COLUMNS[sortBy] ?? SORT_COLUMNS.createdAt;
  const searchValue = `%${search}%`;

  const users = await prisma.$queryRawUnsafe<UserRecord[]>(
    `
      SELECT
        id,
        username,
        email,
        "firstName",
        "lastName",
        role,
        status,
        "lastLogin",
        "failedLoginAttempts",
        "lockedUntil",
        "createdAt",
        "updatedAt"
      FROM "public"."User"
      WHERE
        (
          $1 = ''
          OR lower(username) LIKE lower($2)
          OR lower(email) LIKE lower($2)
          OR lower("firstName") LIKE lower($2)
          OR lower("lastName") LIKE lower($2)
        )
        AND ($3::"public"."UserRole" IS NULL OR role = $3::"public"."UserRole")
        AND ($4::"public"."UserStatus" IS NULL OR status = $4::"public"."UserStatus")
      ORDER BY ${sortColumn} ${sortDirection}, id ASC
      LIMIT $5 OFFSET $6
    `,
    search,
    searchValue,
    role,
    status,
    pageSize,
    offset
  );

  const totalRows = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
    `
      SELECT COUNT(*) AS count
      FROM "public"."User"
      WHERE
        (
          $1 = ''
          OR lower(username) LIKE lower($2)
          OR lower(email) LIKE lower($2)
          OR lower("firstName") LIKE lower($2)
          OR lower("lastName") LIKE lower($2)
        )
        AND ($3::"public"."UserRole" IS NULL OR role = $3::"public"."UserRole")
        AND ($4::"public"."UserStatus" IS NULL OR status = $4::"public"."UserStatus")
    `,
    search,
    searchValue,
    role,
    status
  );
  const total = Number(totalRows[0]?.count ?? 0);

  return {
    users: users.map(toManagedUser),
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.max(Math.ceil(total / pageSize), 1),
    },
  };
}

export async function createUser(input: CreateUserInput) {
  const passwordHash = await bcrypt.hash(input.password, 12);

  try {
    const users = await prisma.$queryRaw<UserRecord[]>`
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
        ${input.username},
        ${input.email},
        ${passwordHash},
        ${input.firstName},
        ${input.lastName},
        ${input.role}::"public"."UserRole",
        ${input.status}::"public"."UserStatus",
        0,
        NOW(),
        NOW()
      )
      RETURNING
        id,
        username,
        email,
        "firstName",
        "lastName",
        role,
        status,
        "lastLogin",
        "failedLoginAttempts",
        "lockedUntil",
        "createdAt",
        "updatedAt"
    `;

    return {
      ok: true as const,
      user: toManagedUser(users[0]),
    };
  } catch {
    return {
      ok: false as const,
      status: 409,
      error: "Ya existe un usuario o correo con esos datos.",
    };
  }
}

async function countActiveAdmins(excludedUserId?: string) {
  const rows = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) AS count
    FROM "public"."User"
    WHERE role = 'ADMIN'::"public"."UserRole"
      AND status = 'ACTIVE'::"public"."UserStatus"
      AND (${excludedUserId ?? null}::text IS NULL OR id <> ${excludedUserId ?? null})
  `;

  return Number(rows[0]?.count ?? 0);
}

async function getUserRoleStatus(userId: string) {
  const users = await prisma.$queryRaw<
    { role: SessionUserRole; status: ManagedUserStatus }[]
  >`
    SELECT role, status
    FROM "public"."User"
    WHERE id = ${userId}
    LIMIT 1
  `;

  return users[0] ?? null;
}

export async function updateUser(
  userId: string,
  input: UpdateUserInput
) {
  const existingUser = await getUserRoleStatus(userId);

  if (!existingUser) {
    return {
      ok: false as const,
      status: 404,
      error: "Usuario no encontrado.",
    };
  }

  const removesLastActiveAdmin =
    existingUser.role === "ADMIN" &&
    existingUser.status === "ACTIVE" &&
    (input.role !== "ADMIN" || input.status !== "ACTIVE") &&
    (await countActiveAdmins(userId)) === 0;

  if (removesLastActiveAdmin) {
    return {
      ok: false as const,
      status: 400,
      error: "No puedes quitar o desactivar el ultimo administrador activo.",
    };
  }

  try {
    const users = await prisma.$queryRaw<UserRecord[]>`
      UPDATE "public"."User"
      SET
        email = ${input.email},
        "firstName" = ${input.firstName},
        "lastName" = ${input.lastName},
        role = ${input.role}::"public"."UserRole",
        status = ${input.status}::"public"."UserStatus",
        "lockedUntil" = CASE
          WHEN ${input.status}::"public"."UserStatus" = 'ACTIVE'::"public"."UserStatus"
          THEN NULL
          ELSE "lockedUntil"
        END,
        "failedLoginAttempts" = CASE
          WHEN ${input.status}::"public"."UserStatus" = 'ACTIVE'::"public"."UserStatus"
          THEN 0
          ELSE "failedLoginAttempts"
        END,
        "updatedAt" = NOW()
      WHERE id = ${userId}
      RETURNING
        id,
        username,
        email,
        "firstName",
        "lastName",
        role,
        status,
        "lastLogin",
        "failedLoginAttempts",
        "lockedUntil",
        "createdAt",
        "updatedAt"
    `;

    return {
      ok: true as const,
      user: toManagedUser(users[0]),
    };
  } catch {
    return {
      ok: false as const,
      status: 409,
      error: "Ya existe un usuario con ese correo.",
    };
  }
}

export async function deleteUser(userId: string) {
  const existingUser = await getUserRoleStatus(userId);

  if (!existingUser) {
    return {
      ok: false as const,
      status: 404,
      error: "Usuario no encontrado.",
    };
  }

  if (
    existingUser.role === "ADMIN" &&
    existingUser.status === "ACTIVE" &&
    (await countActiveAdmins(userId)) === 0
  ) {
    return {
      ok: false as const,
      status: 400,
      error: "No puedes eliminar el ultimo administrador activo.",
    };
  }

  await prisma.$executeRaw`
    DELETE FROM "public"."User"
    WHERE id = ${userId}
  `;

  return {
    ok: true as const,
  };
}

export async function resetUserPassword(
  userId: string,
  temporaryPassword: string
) {
  const passwordHash = await bcrypt.hash(temporaryPassword, 12);

  const updated = await prisma.$executeRaw`
    UPDATE "public"."User"
    SET
      "passwordHash" = ${passwordHash},
      "failedLoginAttempts" = 0,
      "lockedUntil" = NULL,
      "updatedAt" = NOW()
    WHERE id = ${userId}
  `;

  if (updated === 0) {
    return {
      ok: false as const,
      status: 404,
      error: "Usuario no encontrado.",
    };
  }

  return {
    ok: true as const,
  };
}
