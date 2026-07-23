import { NextRequest, NextResponse } from "next/server";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth/session";
import { getUserById } from "@/services/authService";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 401,
      }
    );
  }

  const user = await getUserById(session.userId);

  if (!user) {
    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json({
    user,
  });
}
