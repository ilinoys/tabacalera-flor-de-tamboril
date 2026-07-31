import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth/session";
import {
  changeUserPassword,
  getUserProfile,
  updateUserProfile,
} from "@/services/profileService";

export const runtime = "nodejs";

const imageSchema = z
  .string()
  .trim()
  .max(750_000, "La imagen es demasiado pesada.")
  .refine(
    (value) =>
      value === "" ||
      value.startsWith("data:image/jpeg;base64,") ||
      value.startsWith("data:image/png;base64,") ||
      value.startsWith("data:image/webp;base64,"),
    "La imagen debe ser JPG, PNG o WEBP."
  )
  .optional()
  .nullable();

const updateProfileSchema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  profileImage: imageSchema,
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});

function getSession(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  return verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json(
      {
        error: "No autenticado.",
      },
      {
        status: 401,
      }
    );
  }

  const profile = await getUserProfile(session.userId);

  if (!profile) {
    return NextResponse.json(
      {
        error: "No se encontro el usuario autenticado.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    profile,
  });
}

export async function PATCH(request: NextRequest) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json(
      {
        error: "No autenticado.",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();
  const parsedBody = updateProfileSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Revisa los datos del perfil.",
      },
      {
        status: 400,
      }
    );
  }

  const profile = await updateUserProfile(session.userId, {
    firstName: parsedBody.data.firstName,
    lastName: parsedBody.data.lastName,
    profileImage: parsedBody.data.profileImage || null,
  });

  if (!profile) {
    return NextResponse.json(
      {
        error: "No se pudo actualizar el perfil.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    profile,
  });
}

export async function POST(request: NextRequest) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json(
      {
        error: "No autenticado.",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();
  const parsedBody = changePasswordSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error:
          "La nueva contrasena debe tener mayuscula, minuscula, numero, simbolo y minimo 8 caracteres.",
      },
      {
        status: 400,
      }
    );
  }

  const result = await changeUserPassword(session.userId, parsedBody.data);

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
