"use client";

import { X } from "lucide-react";
import { FormEvent, useState } from "react";

import { ManagedUser } from "./types";

interface ResetPasswordModalProps {
  user: ManagedUser;
  saving: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

function validatePassword(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export default function ResetPasswordModal({
  user,
  saving,
  error,
  onClose,
  onSubmit,
}: ResetPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validatePassword(password)) {
      setLocalError(
        "La contrasena temporal debe tener mayuscula, minuscula, numero, simbolo y minimo 8 caracteres."
      );
      return;
    }

    onSubmit(password);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Restablecer contrasena
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Usuario: {user.username}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-neutral-400 transition hover:text-white"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          {(localError || error) && (
            <div className="rounded-xl border border-red-900/70 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              {localError || error}
            </div>
          )}

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-neutral-300">
              Nueva contrasena temporal
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setLocalError("");
              }}
              className="input-admin"
            />
          </label>

          <div className="flex justify-end gap-3 border-t border-neutral-800 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-neutral-700 px-6 py-3 font-semibold text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white transition hover:bg-yellow-500 disabled:opacity-50"
            >
              {saving ? "Restableciendo..." : "Restablecer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
