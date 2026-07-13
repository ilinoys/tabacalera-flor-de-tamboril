"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Boxes,
  Settings,
} from "lucide-react";

const menu = [
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
    title: "Cotizaciones",
    href: "/admin/cotizaciones",
    icon: FileText,
  },
  {
    title: "Inventario",
    href: "/admin/inventario",
    icon: Boxes,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-72 border-r border-neutral-800 bg-neutral-950">

      <div className="p-8">

        <h1 className="text-2xl font-bold text-yellow-500">
          Flor De Tamboril
        </h1>

        <p className="text-neutral-500">
          Panel Administrativo
        </p>

      </div>

      <nav className="space-y-2 px-4">

        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admin" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-yellow-600 font-semibold text-white shadow-lg"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <Icon size={22} />

              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}