"use client";

import { useEffect, useState } from "react";
import type { QuoteProduct } from "./types";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Props {
  items: QuoteProduct[];
  onAdd: (product: Product) => void;
}

export default function QuoteProducts({
  items,
  onAdd,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await fetch("/api/productos");

      if (!response.ok) {
        throw new Error("No se pudieron cargar los productos.");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
        <p className="text-neutral-400">
          Cargando productos...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Productos
      </h2>

      <div className="space-y-4">

        {products.map((product) => {

          const exists = items.find(
            (item) => item.id === product.id
          );

          return (

            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-black p-5"
            >

              <div>

                <h3 className="font-bold text-white">
                  {product.name}
                </h3>

                <p className="text-neutral-400">
                  Stock: {product.stock}
                </p>

                {exists && (
                  <p className="mt-2 text-sm text-yellow-500">
                    Agregado ({exists.quantity})
                  </p>
                )}

              </div>

              <div className="text-right">

                <p className="mb-3 font-bold text-yellow-500">
                  US$ {product.price.toFixed(2)}
                </p>

                <button
                  onClick={() => onAdd(product)}
                  className="rounded-lg bg-yellow-600 px-4 py-2 font-bold text-white hover:bg-yellow-500"
                >
                  Agregar
                </button>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}