import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE_NAME = "flor_auth_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

export type SessionUserRole =
  | "ADMIN"
  | "MANAGER"
  | "SALES"
  | "INVENTORY"
  | "USER";

export type SessionPayload = {
  userId: string;
  username: string;
  role: SessionUserRole;
  expiresAt: number;
};

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_DURATION_SECONDS,
};

function getSessionSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SESSION_SECRET is required in production.");
  }

  return (
    secret ??
    "flor-de-tamboril-development-session-secret-change-before-production"
  );
}

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

function signaturesMatch(expected: string, actual: string) {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export function createSessionToken(
  payload: Omit<SessionPayload, "expiresAt">
) {
  const sessionPayload: SessionPayload = {
    ...payload,
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  const encodedPayload = toBase64Url(JSON.stringify(sessionPayload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token?: string) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);

  if (!signaturesMatch(expectedSignature, signature)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      fromBase64Url(encodedPayload)
    ) as SessionPayload;

    if (payload.expiresAt < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
