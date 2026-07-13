"use client";

import { Bell, CalendarDays, UserCircle2 } from "lucide-react";

export default function AdminHeader() {
  const today = new Date().toLocaleDateString("es-DO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur">

      <div className="flex items-center justify-between px-10 py-5">

        {/* Información */}

        <div>

          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-neutral-400">
            Bienvenido al panel administrativo de Flor De Tamboril.
          </p>

        </div>

        {/* Lado derecho */}

        <div className="flex items-center gap-4">

          {/* Fecha */}

          <div className="hidden items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300 lg:flex">

            <CalendarDays
              size={18}
              className="text-yellow-500"
            />

            <span className="capitalize">
              {today}
            </span>

          </div>

          {/* Notificaciones */}

          <button className="relative rounded-xl border border-neutral-800 bg-neutral-950 p-3 transition hover:border-yellow-600 hover:bg-neutral-800">

            <Bell
              size={20}
              className="text-yellow-500"
            />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              0
            </span>

          </button>

          {/* Usuario */}

          <div className="flex items-center gap-3 rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-black shadow-lg">

            <UserCircle2 size={24} />

            <div className="hidden md:block">

              <p className="text-sm font-bold">
                Administrador
              </p>

              <p className="text-xs opacity-80">
                Flor De Tamboril
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}