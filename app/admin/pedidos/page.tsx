"use client";

import OrderTable from "@/components/admin/orders/OrderTable";

export default function PedidosPage() {
  return (
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
  );
}