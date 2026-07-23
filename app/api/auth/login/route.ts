import { NextResponse } from "next/server";
import { z } from "zod";

import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { authenticateUser } from "@/services/authService";

const loginSchema = z.object({
  identifier: z.string().trim().min(1),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = loginSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Usuario y contrasena son requeridos.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await authenticateUser(
      parsedBody.data.identifier,
      parsedBody.data.password
    );

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

    const response = NextResponse.json({
      success: true,
      user: result.user,
    });
    const token = createSessionToken({
      userId: result.user.id,
      username: result.user.username,
      role: result.user.role,
    });

    response.cookies.set(
      SESSION_COOKIE_NAME,
      token,
      sessionCookieOptions
    );

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo iniciar sesion.",
      },
      {
        status: 500,
      }
    );
  }
}
