"use client";

import { useCallback, useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "MANAGER" | "SALES" | "INVENTORY" | "USER";
  status: "ACTIVE" | "INACTIVE" | "LOCKED";
  lastLogin: string | null;
};

type LoginInput = {
  identifier: string;
  password: string;
  remember: boolean;
};

type LoginResponse = {
  success?: boolean;
  user?: AuthUser;
  error?: string;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/me", {
        cache: "no-store",
      });

      if (!response.ok) {
        setUser(null);
        return null;
      }

      const data = (await response.json()) as { user: AuthUser | null };
      setUser(data.user);

      return data.user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as LoginResponse;

    if (!response.ok || !data.user) {
      return {
        ok: false,
        error: data.error ?? "No se pudo iniciar sesion.",
      };
    }

    setUser(data.user);

    return {
      ok: true,
      user: data.user,
    };
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    setUser(null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          if (!cancelled) {
            setUser(null);
          }

          return;
        }

        const data = (await response.json()) as {
          user: AuthUser | null;
        };

        if (!cancelled) {
          setUser(data.user);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    refresh,
    login,
    logout,
  };
}
