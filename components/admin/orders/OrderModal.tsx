"use client";

import { useState } from "react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  customerType: string;
  status: string;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
}

interface Props {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

export default function OrderModal({
  open,
  order,
  onClose,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(order?.status ?? "");

  if (!open || !order) return null;

  // A partir de aquí TypeScript sabe que nunca será null
  const currentOrder = order;

  async function saveStatus() {
    try {
      setSaving(true);

      const response = await fetch(`/api/pedidos/${currentOrder.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "No se pudo actualizar el estado.");
      }

      alert("✅ Estado actualizado correctamente.");

      onClose();

      // Temporal.
      // Más adelante reemplazaremos esto por una actualización del estado
      // sin recargar la página.
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al guardar."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-8">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Detalle del Pedido
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-500 sm:px-4"
          >
            Cerrar
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-500">Cliente</h3>

            <p className="text-sm text-white sm:text-base">
              <strong>Nombre:</strong> {currentOrder.customerName}
            </p>

            <p className="text-sm text-white sm:text-base">
              <strong>Empresa:</strong> {currentOrder.company || "-"}
            </p>

            <p className="text-sm text-white sm:text-base">
              <strong>Email:</strong> {currentOrder.email}
            </p>

            <p className="text-sm text-white sm:text-base">
              <strong>WhatsApp:</strong> {currentOrder.phone}
            </p>

            <p className="text-sm text-white sm:text-base">
              <strong>País:</strong> {currentOrder.country}
            </p>

            <p className="text-sm text-white sm:text-base">
              <strong>Ciudad:</strong> {currentOrder.city}
            </p>

            <p className="text-sm text-white sm:text-base">
              <strong>Tipo:</strong> {currentOrder.customerType}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-yellow-500">Productos</h3>

            <div className="space-y-3">
              {currentOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-neutral-800 bg-black p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-white sm:text-base">
                      {item.product.name}
                    </span>

                    <span className="font-bold text-yellow-500">
                      x{item.quantity}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
                    US$ {item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-neutral-800 bg-black p-4 sm:mt-8 sm:p-5">
          <h3 className="mb-3 text-xl font-bold text-yellow-500">Comentarios</h3>
          <p className="text-sm text-white sm:text-base">
            {currentOrder.notes || "Sin comentarios"}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-neutral-800 bg-black p-4 sm:mt-8 sm:p-5">
          <h3 className="mb-4 text-xl font-bold text-yellow-500">Estado del Pedido</h3>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-sm text-white sm:p-4 sm:text-base"
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_REVISION">En revisión</option>
            <option value="COTIZADO">Cotizado</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>

          <button
            onClick={saveStatus}
            disabled={saving}
            className="mt-6 w-full rounded-lg bg-yellow-600 py-3 font-bold text-white hover:bg-yellow-500 disabled:opacity-50 sm:py-4"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}
