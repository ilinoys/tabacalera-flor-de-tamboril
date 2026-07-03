"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur border-b border-yellow-700"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
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

        {/* Menú */}
        <nav className="hidden lg:flex items-center gap-8 text-white">

          <Link href="/">Inicio</Link>

          <Link href="/tienda">Tienda</Link>

          <a href="#historia">Historia</a>

          <a href="#galeria">Galería</a>

          <a href="#contacto">Contacto</a>

        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-5">

          <button className="text-white hover:text-yellow-500">
            <Search size={22} />
          </button>

          <Link
            href="/carrito"
            className="relative text-white hover:text-yellow-500"
          >
            <ShoppingCart size={24} />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black">
  {totalItems()}
</span>
          </Link>

          <button className="text-white hover:text-yellow-500">
            <User size={22} />
          </button>

          <button className="lg:hidden text-white">
            <Menu size={28} />
          </button>

        </div>

      </div>
    </header>
  );
}