"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
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
  return (
    <aside className="w-72 min-h-screen bg-neutral-950 border-r border-neutral-800">

      <div className="p-8">

        <h1 className="text-2xl font-bold text-yellow-500">
          Flor De Tamboril
        </h1>

        <p className="text-neutral-500">
          Panel Administrativo
        </p>

      </div>

      <nav className="px-4 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-neutral-300 transition hover:bg-yellow-600 hover:text-white"
            >
              <Icon size={22} />

              {item.title}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}