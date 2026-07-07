"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { useProductStore } from "@/store/productStore";

export default function ProductTable() {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  function handleDelete(id: string, name: string) {
    const confirmDelete = window.confirm(
      `¿Deseas eliminar el producto "${name}"?`
    );

    if (!confirmDelete) return;

    deleteProduct(id);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
      <table className="w-full">
        <thead className="bg-neutral-950">
          <tr>
            <th className="p-4 text-left text-yellow-500">Imagen</th>
            <th className="p-4 text-left text-yellow-500">Producto</th>
            <th className="p-4 text-left text-yellow-500">Categoría</th>
            <th className="p-4 text-left text-yellow-500">Precio</th>
            <th className="p-4 text-left text-yellow-500">Stock</th>
            <th className="p-4 text-center text-yellow-500">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="p-8 text-center text-neutral-400"
              >
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-neutral-800 transition hover:bg-neutral-800/40"
              >
                <td className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={70}
                    height={70}
                    className="rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-semibold text-white">
                  {product.name}
                </td>

                <td className="p-4 text-neutral-300">
                  {product.category}
                </td>

                <td className="p-4 font-semibold text-yellow-500">
                  US$ {product.price.toFixed(2)}
                </td>

                <td className="p-4 text-white">
                  {product.stock}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">

                    <button
                      className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-500"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product.id, product.name)
                      }
                      className="rounded-lg bg-red-600 p-2 transition hover:bg-red-500"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}