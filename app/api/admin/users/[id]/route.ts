import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth/session";
import {
  assertAdminSession,
  deleteUser,
  updateUser,
} from "@/services/adminUserService";

export const runtime = "nodejs";

const roles = ["ADMIN", "MANAGER", "SALES", "INVENTORY", "USER"] as const;
const statuses = ["ACTIVE", "INACTIVE", "LOCKED"] as const;

const updateUserSchema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(120),
  role: z.enum(roles),
  status: z.enum(statuses),
});

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

function getSession(request: NextRequest) {
  return verifySessionToken(
    request.cookies.get(SESSION_COOKIE_NAME)?.value
  );
}

export async function PUT(
  request: NextRequest,
  { params }: RouteProps
) {
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

  const { id } = await params;
  const body = await request.json();
  const parsedBody = updateUserSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Revisa los datos del usuario.",
      },
      {
        status: 400,
      }
    );
  }

  const result = await updateUser(id, parsedBody.data);

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

  return NextResponse.json({
    user: result.user,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteProps
) {
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

  const { id } = await params;
  const result = await deleteUser(id);

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

  return NextResponse.json({
    success: true,
  });
}
