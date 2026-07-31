"use client";

import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import {
  ManagedUser,
  USER_ROLES,
  USER_STATUSES,
  UserFormData,
} from "./types";

interface UserFormModalProps {
  mode: "create" | "edit";
  user?: ManagedUser | null;
  saving: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

const initialForm: UserFormData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  role: "USER",
  status: "ACTIVE",
};

function validatePassword(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export default function UserFormModal({
  mode,
  user,
  saving,
  error,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const [form, setForm] = useState<UserFormData>(initialForm);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!user) {
      setForm(initialForm);
      return;
    }

    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });
  }, [user]);

  function update(field: keyof UserFormData, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setLocalError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.firstName.trim().length < 2) {
      setLocalError("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (form.lastName.trim().length < 2) {
      setLocalError("El apellido debe tener al menos 2 caracteres.");
      return;
    }

    if (mode === "create" && form.username.trim().length < 3) {
      setLocalError("El usuario debe tener al menos 3 caracteres.");
      return;
    }

    if (!form.email.includes("@")) {
      setLocalError("Ingresa un correo valido.");
      return;
    }

    if (mode === "create" && !validatePassword(form.password)) {
      setLocalError(
        "La contrasena temporal debe tener mayuscula, minuscula, numero, simbolo y minimo 8 caracteres."
      );
      return;
    }

    onSubmit({
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {mode === "create" ? "Crear usuario" : "Editar usuario"}
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Gestiona acceso, rol y estado dentro del ERP.
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

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nombre">
              <input
                value={form.firstName}
                onChange={(event) =>
                  update("firstName", event.target.value)
                }
                className="input-admin"
              />
            </Field>

            <Field label="Apellido">
              <input
                value={form.lastName}
                onChange={(event) =>
                  update("lastName", event.target.value)
                }
                className="input-admin"
              />
            </Field>

            <Field label="Usuario">
              <input
                value={form.username}
                onChange={(event) =>
                  update("username", event.target.value)
                }
                readOnly={mode === "edit"}
                className={`input-admin ${
                  mode === "edit" ? "cursor-not-allowed opacity-60" : ""
                }`}
              />
            </Field>

            <Field label="Correo">
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  update("email", event.target.value)
                }
                className="input-admin"
              />
            </Field>

            {mode === "create" && (
              <Field label="Contrasena temporal">
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    update("password", event.target.value)
                  }
                  className="input-admin"
                />
              </Field>
            )}

            <Field label="Rol">
              <select
                value={form.role}
                onChange={(event) => update("role", event.target.value)}
                className="input-admin"
              >
                {USER_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Estado">
              <select
                value={form.status}
                onChange={(event) =>
                  update("status", event.target.value)
                }
                className="input-admin"
              >
                {USER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>
          </div>

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
              {saving ? "Guardando..." : "Guardar usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-neutral-300">
        {label}
      </span>
      {children}
    </label>
  );
}
