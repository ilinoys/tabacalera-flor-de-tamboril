"use client";

import { formatCurrency } from "@/lib/currency";

interface Item {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  items: Item[];
  currency: string;
  onUpdateQuantity: (
    productId: string,
    quantity: number
  ) => void;
  onRemove: (productId: string) => void;
}

export default function QuotationItems({
  items,
  currency,
  onUpdateQuantity,
  onRemove,
}: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-700 p-8 text-center text-neutral-400">
        Aún no hay productos agregados.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">

      <table className="w-full">

        <thead className="bg-neutral-950">

          <tr>

            <th className="p-4 text-left text-yellow-500">
              Producto
            </th>

            <th className="p-4 text-center text-yellow-500">
              Cantidad
            </th>

            <th className="p-4 text-center text-yellow-500">
              Precio
            </th>

            <th className="p-4 text-center text-yellow-500">
              Total
            </th>

            <th className="p-4 text-center text-yellow-500">
              Acción
            </th>

          </tr>

        </thead>

        <tbody>

          {items.map((item) => (

            <tr
              key={item.productId}
              className="border-t border-neutral-800"
            >

              <td className="p-4 font-semibold text-white">
                {item.name}
              </td>

              <td className="p-4 text-center">

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    onUpdateQuantity(
                      item.productId,
                      Number(e.target.value)
                    )
                  }
                  className="w-24 rounded-lg border border-neutral-700 bg-black px-3 py-2 text-center text-white"
                />

              </td>

              <td className="p-4 text-center text-white">
                {formatCurrency(item.price, currency)}
              </td>

              <td className="p-4 text-center font-bold text-yellow-500">
                {formatCurrency(
                  item.price * item.quantity,
                  currency
                )}
              </td>

              <td className="p-4 text-center">

                <button
                  type="button"
                  onClick={() => onRemove(item.productId)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
