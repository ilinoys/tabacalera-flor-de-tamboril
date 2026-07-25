"use client";

import { useEffect, useState } from "react";
import OrderModal from "./OrderModal";

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

async function fetchOrders() {
  const response = await fetch("/api/pedidos");
  return response.json() as Promise<Order[]>;
}

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      try {
        const data = await fetchOrders();

        if (!cancelled) {
          setOrders(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  function openOrder(order: Order) {
    setSelectedOrder(order);
    setOpenModal(true);
  }

  function closeOrder() {
    setOpenModal(false);
    setSelectedOrder(null);
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center text-white">
        Cargando pedidos...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        <table className="w-full">
          <thead className="bg-neutral-950">
            <tr>
              <th className="p-4 text-left text-yellow-500">
                Cliente
              </th>

              <th className="p-4 text-left text-yellow-500">
                País
              </th>

              <th className="p-4 text-left text-yellow-500">
                Tipo
              </th>

              <th className="p-4 text-left text-yellow-500">
                Productos
              </th>

              <th className="p-4 text-left text-yellow-500">
                Estado
              </th>

              <th className="p-4 text-left text-yellow-500">
                Fecha
              </th>

              <th className="p-4 text-center text-yellow-500">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-neutral-800 hover:bg-neutral-800/40"
              >
                <td className="p-4">
                  <div className="font-semibold text-white">
                    {order.customerName}
                  </div>

                  <div className="text-sm text-neutral-400">
                    {order.email}
                  </div>
                </td>

                <td className="p-4 text-white">
                  {order.country}
                </td>

                <td className="p-4 text-white">
                  {order.customerType}
                </td>

                <td className="p-4 text-white">
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-yellow-600 px-3 py-1 text-sm font-bold text-white">
                    {order.status}
                  </span>
                </td>

                <td className="p-4 text-neutral-300">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => openOrder(order)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-neutral-400"
                >
                  No hay pedidos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <OrderModal
        key={selectedOrder?.id ?? "no-order"}
        open={openModal}
        order={selectedOrder}
        onClose={closeOrder}
      />
    </>
  );
}
