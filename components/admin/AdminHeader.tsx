"use client";

import {
  Bell,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

type AdminHeaderProps = {
  setIsSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function AdminHeader({
  setIsSidebarOpen,
}: AdminHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();
  const today = new Date().toLocaleDateString("es-DO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const userFullName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Administrador";
  const userInitials = userFullName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  async function handleLogout() {
    setUserMenuOpen(false);
    await logout();
    router.replace("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur">
      <div className="flex items-center justify-between px-10 py-5">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-neutral-400">
            Bienvenido al panel administrativo de Flor De Tamboril.
          </p>
        </div>

        <div className="flex items-center gap-3">

  <button
    type="button"
    onClick={() => setIsSidebarOpen(true)}
    className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 text-white transition hover:border-yellow-600 lg:hidden"
    aria-label="Abrir menú"
  >
    <Menu size={22} />
  </button>
          <div className="hidden items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300 lg:flex">
            <CalendarDays
              size={18}
              className="text-yellow-500"
            />

            <span className="capitalize">
              {today}
            </span>
          </div>

          <button
            type="button"
            className="relative rounded-xl border border-neutral-800 bg-neutral-950 p-3 transition hover:border-yellow-600 hover:bg-neutral-800"
            aria-label="Notificaciones"
          >
            <Bell
              size={20}
              className="text-yellow-500"
            />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              0
            </span>
          </button>

          <div
            className="relative"
            ref={userMenuRef}
          >
            <button
              type="button"
              onClick={() => setUserMenuOpen((open) => !open)}
              className="flex items-center gap-3 rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-black shadow-lg transition hover:brightness-110"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
            >
              <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-black/15 text-xs font-bold">
                {user?.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt={userFullName}
                    fill
                    className="object-cover"
                    sizes="24px"
                    unoptimized
                  />
                ) : (
                  userInitials || <UserCircle2 size={24} />
                )}
              </span>

              <div className="hidden text-left md:block">
                <p className="text-sm font-bold">
                  {userFullName}
                </p>

                <p className="text-xs opacity-80">
                  Flor De Tamboril
                </p>
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-sm text-white shadow-2xl">
                <div className="border-b border-neutral-800 px-3 py-3">
                  <p className="font-semibold">
                    {userFullName}
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    {user?.email ?? "admin@flordetamboril.com"}
                  </p>
                </div>

                <Link
                  href="/admin"
                  onClick={() => setUserMenuOpen(false)}
                  className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-neutral-800 hover:text-yellow-500"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>

                <Link
                  href="/admin/perfil"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-neutral-800 hover:text-yellow-500"
                >
                  <User size={17} />
                  Mi perfil
                </Link>

                <Link
                  href="/admin/configuracion"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-neutral-800 hover:text-yellow-500"
                >
                  <Settings size={17} />
                  Configuración
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 rounded-lg border-t border-neutral-800 px-3 py-2 text-left text-red-300 transition hover:bg-red-950/40 hover:text-red-200"
                >
                  <LogOut size={17} />
                  Cerrar sesion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
