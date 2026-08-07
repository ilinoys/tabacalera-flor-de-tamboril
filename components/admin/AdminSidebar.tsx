"use client";

import {
  Boxes,
  FileText,
  Globe,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  UserCog,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MenuItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  children?: {
    title: string;
    href: string;
  }[];
};

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Productos",
    href: "/admin/productos",
    icon: Package,
  },
  {
    title: "Pedidos",
    href: "/admin/pedidos",
    icon: ShoppingCart,
  },
  {
    title: "Clientes",
    href: "/admin/clientes",
    icon: Users,
  },
  {
    title: "Usuarios",
    href: "/admin/usuarios",
    icon: UserCog,
  },
  {
    title: "Cotizaciones",
    href: "/admin/cotizaciones",
    icon: FileText,
  },
  {
    title: "Mi Perfil",
    href: "/admin/perfil",
    icon: UserCircle,
  },
  {
    title: "Inventario",
    href: "/admin/inventario",
    icon: Boxes,
    children: [
      {
        title: "Materias Primas",
        href: "/admin/inventario/materias-primas",
      },
    ],
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 text-white shadow-xl transition hover:border-yellow-600 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72
          flex-col border-r border-neutral-800
          bg-neutral-950 transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:static
          lg:translate-x-0
        `}
      >
              <div className="flex items-center justify-between border-b border-neutral-800 p-6">
          <div>
            <h1 className="text-2xl font-bold text-yellow-500">
              Flor De Tamboril
            </h1>

            <p className="text-sm text-neutral-500">
              Panel Administrativo
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname.startsWith(item.href));

            return (
              <div key={item.title}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                    active
                      ? "bg-yellow-600 font-semibold text-white shadow-lg"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <Icon size={22} />

                  <span>{item.title}</span>
                </Link>

                {item.children && active && (
                  <div className="mt-2 space-y-2 pl-10">
                    {item.children.map((child) => {
                      const childActive =
                        pathname === child.href;

                      return (
                        <Link
                          key={child.title}
                          href={child.href}
                          className={`block rounded-xl px-4 py-2 text-sm transition-all ${
                            childActive
                              ? "bg-neutral-800 font-semibold text-yellow-500"
                              : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                          }`}
                        >
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-neutral-800 p-4">
          <Link
            href="/"
            className="flex items-center gap-4 rounded-xl px-4 py-3 text-neutral-300 transition-all duration-200 hover:bg-neutral-800 hover:text-white"
          >
            <Globe size={22} />

            <span>Volver al Sitio Web</span>
          </Link>
        </div>
              </aside>
    </>
  );
}