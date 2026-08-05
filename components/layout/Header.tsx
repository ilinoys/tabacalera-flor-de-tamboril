"use client";

import {
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";

const publicLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/#historia", label: "Historia" },
  { href: "/#galeria", label: "Galeria" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
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

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  async function handleLogout() {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    await logout();
    router.replace("/");
  }

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "border-b border-yellow-700 bg-black/95 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo/logo.png"
            alt="Logo"
            width={55}
            height={55}
            priority
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
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            className="hidden min-h-11 min-w-11 items-center justify-center text-white hover:text-yellow-500 sm:flex"
            aria-label="Buscar"
          >
            <Search size={22} />
          </button>

          <Link
            href="/carrito"
            className="relative flex min-h-11 min-w-11 items-center justify-center text-white hover:text-yellow-500"
            aria-label="Carrito"
          >
            <ShoppingCart size={24} />

            {totalItems > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          {!isLoading && isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-yellow-500"
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
                <UserMenu
                  userFullName={userFullName}
                  email={user?.email}
                  onLogout={handleLogout}
                  onNavigate={() => setUserMenuOpen(false)}
                />
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-yellow-500"
              title="Iniciar sesion"
              aria-label="Iniciar sesion"
            >
              <User size={22} />
            </Link>
          )}

          <div className="relative lg:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex min-h-11 min-w-11 items-center justify-center text-white"
              aria-label={
                mobileMenuOpen ? "Cerrar menu" : "Abrir menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {mobileMenuOpen && (
              <nav className="absolute right-0 mt-4 w-72 rounded-2xl border border-white/10 bg-neutral-950 p-3 text-sm text-white shadow-2xl">
                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-3 transition hover:bg-neutral-800 hover:text-yellow-500"
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/carrito"
                  className="mt-2 block rounded-xl border-t border-white/10 px-4 py-3 transition hover:bg-neutral-800 hover:text-yellow-500"
                >
                  Carrito ({totalItems})
                </Link>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function UserMenu({
  userFullName,
  email,
  onLogout,
  onNavigate,
}: {
  userFullName: string;
  email?: string;
  onLogout: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="absolute right-0 mt-4 w-64 rounded-xl border border-white/10 bg-neutral-950 p-2 text-sm text-white shadow-2xl">
      <div className="border-b border-white/10 px-3 py-3">
        <p className="font-semibold">{userFullName}</p>
        <p className="mt-1 text-xs text-neutral-400">
          {email}
        </p>
      </div>

      <Link
        href="/admin"
        onClick={onNavigate}
        className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-neutral-800 hover:text-yellow-500"
      >
        <LayoutDashboard size={17} />
        Dashboard
      </Link>

      <Link
        href="/admin/perfil"
        onClick={onNavigate}
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
        onClick={onLogout}
        className="mt-2 flex w-full items-center gap-3 rounded-lg border-t border-white/10 px-3 py-2 text-left text-red-300 transition hover:bg-red-950/40 hover:text-red-200"
      >
        <LogOut size={17} />
        Cerrar sesion
      </button>
    </div>
  );
}
