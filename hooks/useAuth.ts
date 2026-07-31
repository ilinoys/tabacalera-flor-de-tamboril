"use client";

import { useCallback, useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role: "ADMIN" | "MANAGER" | "SALES" | "INVENTORY" | "USER";
  status: "ACTIVE" | "INACTIVE" | "LOCKED";
  lastLogin: string | null;
  createdAt?: string;
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

const AUTH_CHANGED_EVENT = "flor-auth-changed";

async function fetchCurrentUser() {
  const response = await fetch("/api/auth/me", {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { user: AuthUser | null };

  return data.user;
}

function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);

    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);

      return currentUser;
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
    notifyAuthChanged();

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
    notifyAuthChanged();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      setIsLoading(true);

      try {
        const currentUser = await fetchCurrentUser();

        if (!cancelled) {
          setUser(currentUser);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadUser();

    function handleAuthChanged() {
      void loadUser();
    }

    window.addEventListener(AUTH_CHANGED_EVENT, handleAuthChanged);

    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_CHANGED_EVENT, handleAuthChanged);
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
