"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function InventarioPage() {
  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-10">

          <h1 className="text-4xl font-bold text-white">
            Inventario
          </h1>

          <p className="mt-3 text-neutral-400">
            Próximamente administraremos el inventario de la tabacalera.
          </p>

        </div>
      </div>
    </main>
  );
}