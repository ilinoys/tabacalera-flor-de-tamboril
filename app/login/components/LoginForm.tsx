"use client";

import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/hooks/useAuth";

type LoginErrors = {
  identifier?: string;
  password?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage("");

    const nextErrors: LoginErrors = {};
    const trimmedIdentifier = identifier.trim();

    if (!trimmedIdentifier) {
      nextErrors.identifier = "Ingresa tu usuario o correo electronico.";
    }

    if (!password) {
      nextErrors.password = "Ingresa tu contrasena.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login({
        identifier: trimmedIdentifier,
        password,
        remember,
      });

      if (!result.ok) {
        setErrors({
          password: result.error,
        });
        return;
      }

      setSubmitMessage("Login enviado correctamente.");
      router.replace("/admin");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label
          htmlFor="identifier"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Usuario o correo electronico
        </label>

        <div className="flex items-center rounded-xl border border-gray-700 bg-[#111111] px-4 transition-colors focus-within:border-[#D4AF37]">
          <User className="h-5 w-5 text-gray-500" aria-hidden="true" />

          <input
            id="identifier"
            name="identifier"
            type="text"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value);
              setSubmitMessage("");
              setErrors((currentErrors) => ({
                ...currentErrors,
                identifier: undefined,
              }));
            }}
            placeholder="Ingrese su usuario o correo"
            autoComplete="username"
            disabled={isLoading}
            aria-invalid={Boolean(errors.identifier)}
            aria-describedby={
              errors.identifier ? "identifier-error" : undefined
            }
            className="w-full bg-transparent px-3 py-3 text-base text-white placeholder:text-gray-500 outline-none disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>

        {errors.identifier && (
          <p id="identifier-error" className="mt-2 text-sm text-red-400">
            {errors.identifier}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Contrasena
        </label>

        <div className="flex items-center rounded-xl border border-gray-700 bg-[#111111] px-4 transition-colors focus-within:border-[#D4AF37]">
          <Lock className="h-5 w-5 text-gray-500" aria-hidden="true" />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setSubmitMessage("");
              setErrors((currentErrors) => ({
                ...currentErrors,
                password: undefined,
              }));
            }}
            placeholder="Ingrese su contrasena"
            autoComplete="current-password"
            disabled={isLoading}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="w-full bg-transparent px-3 py-3 text-base text-white placeholder:text-gray-500 outline-none disabled:cursor-not-allowed disabled:opacity-70"
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            disabled={isLoading}
            aria-label={
              showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
            }
            className="flex min-h-11 min-w-11 items-center justify-center text-gray-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {errors.password && (
          <p id="password-error" className="mt-2 text-sm text-red-400">
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-gray-400">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            disabled={isLoading}
            className="accent-[#D4AF37] disabled:cursor-not-allowed"
          />
          Recordarme
        </label>

        <button
          type="button"
          className="min-h-11 font-medium text-[#D4AF37] transition hover:underline"
        >
          Olvidaste tu contrasena?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3 font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
        {isLoading ? "Iniciando sesion..." : "Iniciar sesion"}
      </button>

      {submitMessage && (
        <p className="text-center text-sm font-medium text-emerald-400">
          {submitMessage}
        </p>
      )}
    </form>
  );
}
