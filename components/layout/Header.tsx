"use client";

import {
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const userFullName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "";
  const userInitials = userFullName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-yellow-700 bg-black/95 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo/logo.png"
            alt="Logo"
            width={55}
            height={55}
          />

          <div>
            <h1 className="text-lg font-bold text-yellow-500">
              Tabacalera
            </h1>

            <p className="text-sm text-white">
              Flor De Tamboril
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-white lg:flex">
          <Link href="/">Inicio</Link>
          <Link href="/tienda">Tienda</Link>
          <a href="#historia">Historia</a>
          <a href="#galeria">Galeria</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="flex items-center gap-5">
          <button
            type="button"
            className="text-white hover:text-yellow-500"
            aria-label="Buscar"
          >
            <Search size={22} />
          </button>

          <Link
            href="/carrito"
            className="relative text-white hover:text-yellow-500"
          >
            <ShoppingCart size={24} />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          {!isLoading && isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="text-white transition-colors hover:text-yellow-500"
                title={userFullName}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full text-xs font-bold">
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={userFullName}
                      fill
                      className="object-cover"
                      sizes="28px"
                      unoptimized
                    />
                  ) : (
                    userInitials || <User size={22} />
                  )}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-4 w-64 rounded-xl border border-white/10 bg-neutral-950 p-2 text-sm text-white shadow-2xl">
                  <div className="border-b border-white/10 px-3 py-3">
                    <p className="font-semibold">{userFullName}</p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {user?.email}
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

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-neutral-400"
                    title="Proximamente"
                  >
                    <Settings size={17} />
                    Configuracion
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-lg border-t border-white/10 px-3 py-2 text-left text-red-300 transition hover:bg-red-950/40 hover:text-red-200"
                  >
                    <LogOut size={17} />
                    Cerrar sesion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white transition-colors hover:text-yellow-500"
              title="Iniciar sesion"
            >
              <User size={22} />
            </Link>
          )}

          <button
            type="button"
            className="text-white lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
