"use client";

import {
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

type Profile = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role: string;
  status: string;
  lastLogin: string | null;
  createdAt: string;
};

type Message = {
  type: "success" | "error";
  text: string;
};

const PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

function formatDate(value: string | null) {
  if (!value) {
    return "Sin registro";
  }

  return new Intl.DateTimeFormat("es-DO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function profileInitials(firstName: string, lastName: string) {
  const firstInitial = firstName.trim().charAt(0);
  const lastInitial = lastName.trim().charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
}

export default function ProfileForm() {
  const { refresh } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const fullName = useMemo(
    () => `${firstName} ${lastName}`.trim(),
    [firstName, lastName]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await fetch("/api/auth/profile", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "No se pudo cargar el perfil.");
        }

        if (!cancelled) {
          const loadedProfile = data.profile as Profile;

          setProfile(loadedProfile);
          setFirstName(loadedProfile.firstName);
          setLastName(loadedProfile.lastName);
          setProfileImage(loadedProfile.profileImage);
        }
      } catch (error) {
        if (!cancelled) {
          setMessage({
            type: "error",
            text:
              error instanceof Error
                ? error.message
                : "No se pudo cargar el perfil.",
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  function validateProfile() {
    if (firstName.trim().length < 2) {
      return "El nombre debe tener al menos 2 caracteres.";
    }

    if (lastName.trim().length < 2) {
      return "El apellido debe tener al menos 2 caracteres.";
    }

    return null;
  }

  function validatePassword() {
    if (!currentPassword) {
      return "Ingresa tu contrasena actual.";
    }

    if (!PASSWORD_RULE.test(newPassword)) {
      return "La nueva contrasena debe tener mayuscula, minuscula, numero, simbolo y minimo 8 caracteres.";
    }

    if (newPassword !== confirmPassword) {
      return "La confirmacion no coincide con la nueva contrasena.";
    }

    return null;
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage({
        type: "error",
        text: "La foto debe ser JPG, PNG o WEBP.",
      });
      return;
    }

    if (file.size > 700 * 1024) {
      setMessage({
        type: "error",
        text: "La foto no debe superar 700 KB.",
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(String(reader.result));
      setMessage(null);
    };

    reader.readAsDataURL(file);
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const validationError = validateProfile();

    if (validationError) {
      setMessage({
        type: "error",
        text: validationError,
      });
      return;
    }

    try {
      setSavingProfile(true);

      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          profileImage,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo actualizar el perfil.");
      }

      const updatedProfile = data.profile as Profile;

      setProfile(updatedProfile);
      setFirstName(updatedProfile.firstName);
      setLastName(updatedProfile.lastName);
      setProfileImage(updatedProfile.profileImage);
      await refresh();
      setMessage({
        type: "success",
        text: "Perfil actualizado correctamente.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "No se pudo actualizar el perfil.",
      });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const validationError = validatePassword();

    if (validationError) {
      setMessage({
        type: "error",
        text: validationError,
      });
      return;
    }

    try {
      setSavingPassword(true);

      const response = await fetch("/api/auth/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo cambiar la contrasena.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage({
        type: "success",
        text: "Contrasena actualizada correctamente.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "No se pudo cambiar la contrasena.",
      });
    } finally {
      setSavingPassword(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-10 text-center text-white">
        Cargando perfil...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-10 text-center text-red-200">
        No se pudo cargar la informacion del perfil.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Mi Perfil
        </h1>

        <p className="mt-2 text-neutral-400">
          Administra tu informacion personal, foto de perfil y contrasena.
        </p>
      </div>

      {message && (
        <div
          className={`flex items-center gap-3 rounded-2xl border p-4 text-sm ${
            message.type === "success"
              ? "border-emerald-900/70 bg-emerald-950/40 text-emerald-200"
              : "border-red-900/70 bg-red-950/40 text-red-200"
          }`}
        >
          <CheckCircle2 size={18} />
          {message.text}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[360px_1fr]">
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-yellow-600 bg-neutral-950 text-4xl font-bold text-yellow-500">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={fullName}
                  fill
                  className="object-cover"
                  sizes="144px"
                  unoptimized
                />
              ) : (
                profileInitials(firstName, lastName)
              )}
            </div>

            <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-yellow-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-yellow-500">
              <Camera size={18} />
              Cambiar foto
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>

            {profileImage && (
              <button
                type="button"
                onClick={() => setProfileImage(null)}
                className="mt-3 text-sm text-neutral-400 transition hover:text-white"
              >
                Quitar foto
              </button>
            )}

            <h2 className="mt-6 text-2xl font-bold text-white">
              {fullName}
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              {profile.email}
            </p>
          </div>

          <div className="mt-8 space-y-4 border-t border-neutral-800 pt-6 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Rol</span>
              <span className="rounded-full bg-yellow-600/20 px-3 py-1 font-semibold text-yellow-500">
                {profile.role}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Usuario</span>
              <span className="text-neutral-200">{profile.username}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Creado</span>
              <span className="text-right text-neutral-200">
                {formatDate(profile.createdAt)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Ultimo acceso</span>
              <span className="text-right text-neutral-200">
                {formatDate(profile.lastLogin)}
              </span>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <form
            onSubmit={handleProfileSubmit}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <UserCircle2 className="text-yellow-500" size={24} />
              <div>
                <h2 className="text-2xl font-bold text-yellow-500">
                  Informacion personal
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Actualiza tu nombre visible dentro del ERP.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-neutral-300"
                >
                  Nombre
                </label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-neutral-300"
                >
                  Apellido
                </label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-neutral-300"
                >
                  Correo
                </label>
                <input
                  id="email"
                  value={profile.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-400 outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white transition hover:bg-yellow-500 disabled:opacity-50"
              >
                {savingProfile && (
                  <Loader2 size={18} className="animate-spin" />
                )}
                Guardar perfil
              </button>
            </div>
          </form>

          <form
            onSubmit={handlePasswordSubmit}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="text-yellow-500" size={24} />
              <div>
                <h2 className="text-2xl font-bold text-yellow-500">
                  Seguridad
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Cambia tu contrasena usando tu clave actual.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-semibold text-neutral-300"
                >
                  Contrasena actual
                </label>
                <input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(event.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-semibold text-neutral-300"
                  >
                    Nueva contrasena
                  </label>
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(event.target.value)
                    }
                    className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-neutral-300"
                  >
                    Confirmar contrasena
                  </label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                {showPassword ? "Ocultar" : "Mostrar"} contrasenas
              </button>

              <button
                type="submit"
                disabled={savingPassword}
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white transition hover:bg-yellow-500 disabled:opacity-50"
              >
                {savingPassword ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <KeyRound size={18} />
                )}
                Cambiar contrasena
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
