import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth/session";
import {
  assertAdminSession,
  createUser,
  listUsers,
} from "@/services/adminUserService";
import type {
  ManagedUserStatus,
  UserListParams,
} from "@/services/adminUserService";
import type { SessionUserRole } from "@/lib/auth/session";

export const runtime = "nodejs";

const roles = ["ADMIN", "MANAGER", "SALES", "INVENTORY", "USER"] as const;
const statuses = ["ACTIVE", "INACTIVE", "LOCKED"] as const;
const sortFields = [
  "name",
  "username",
  "email",
  "role",
  "status",
  "createdAt",
] as const;

function isRole(value: string | null): value is SessionUserRole {
  return Boolean(value && (roles as readonly string[]).includes(value));
}

function isStatus(value: string | null): value is ManagedUserStatus {
  return Boolean(value && (statuses as readonly string[]).includes(value));
}

function isSortField(
  value: string | null
): value is NonNullable<UserListParams["sortBy"]> {
  return Boolean(value && (sortFields as readonly string[]).includes(value));
}

const createUserSchema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  username: z
    .string()
    .trim()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z0-9._-]+$/),
  email: z.string().trim().email().max(120),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
  role: z.enum(roles),
  status: z.enum(statuses),
});

function getSession(request: NextRequest) {
  return verifySessionToken(
    request.cookies.get(SESSION_COOKIE_NAME)?.value
  );
}

export async function GET(request: NextRequest) {
  const admin = assertAdminSession(getSession(request));

  if (!admin.ok) {
    return NextResponse.json(
      {
        error: admin.error,
      },
      {
        status: admin.status,
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const status = searchParams.get("status");
  const sortBy = searchParams.get("sortBy");
  const sortDirection = searchParams.get("sortDirection");
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);

  const result = await listUsers({
    search: searchParams.get("search") ?? "",
    role: isRole(role) ? role : "ALL",
    status: isStatus(status) ? status : "ALL",
    sortBy: isSortField(sortBy) ? sortBy : "createdAt",
    sortDirection: sortDirection === "asc" ? "asc" : "desc",
    page: Number.isFinite(page) ? page : 1,
    pageSize: Number.isFinite(pageSize) ? pageSize : 10,
  });

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const admin = assertAdminSession(getSession(request));

  if (!admin.ok) {
    return NextResponse.json(
      {
        error: admin.error,
      },
      {
        status: admin.status,
      }
    );
  }

  const body = await request.json();
  const parsedBody = createUserSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error:
          "Revisa los datos del usuario y la contrasena temporal.",
      },
      {
        status: 400,
      }
    );
  }

  const result = await createUser(parsedBody.data);

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
      },
      {
        status: result.status,
      }
    );
  }

  return NextResponse.json(
    {
      user: result.user,
    },
    {
      status: 201,
    }
  );
}
