"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
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

          <a href="#galeria">Galería</a>

          <a href="#contacto">Contacto</a>
        </nav>

        <div className="flex items-center gap-5">
          <button className="text-white hover:text-yellow-500">
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

          <Link
  href="/login"
  className="text-white hover:text-yellow-500 transition-colors"
  title="Iniciar sesión"
>
  <User size={22} />
</Link>

          <button className="text-white lg:hidden">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}