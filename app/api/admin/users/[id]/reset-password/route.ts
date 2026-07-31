import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth/session";
import {
  assertAdminSession,
  resetUserPassword,
} from "@/services/adminUserService";

export const runtime = "nodejs";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
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

export async function POST(
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
  const parsedBody = resetPasswordSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error:
          "La contrasena temporal debe tener mayuscula, minuscula, numero, simbolo y minimo 8 caracteres.",
      },
      {
        status: 400,
      }
    );
  }

  const result = await resetUserPassword(id, parsedBody.data.password);

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
