"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderTable from "@/components/admin/orders/OrderTable";

export default function PedidosPage() {
  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Solicitudes de Pedidos
              </h1>

              <p className="mt-2 text-neutral-400">
                Administra todas las solicitudes recibidas desde la página web.
              </p>
            </div>
          </div>

          <OrderTable />
        </div>
      </div>
    </main>
  );
}