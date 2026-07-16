"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/currency";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Props {
  currency: string;
  onAdd: (product: Product) => void;
}

export default function ProductSelector({
  currency,
  onAdd,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch("/api/productos");

        if (!response.ok) {
          throw new Error("No se pudieron cargar los productos.");
        }

        const data = await response.json();

        if (!cancelled) {
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  function addProduct() {
    const product = products.find((p) => p.id === selected);

    if (!product) return;

    onAdd(product);

    setSelected("");
  }

  return (
    <div className="space-y-2">

      <label className="text-sm font-semibold text-white">
        Agregar producto
      </label>

      <div className="flex gap-3">

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white"
        >
          <option value="">
            Seleccione un producto
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name} | {formatCurrency(
                product.price,
                currency
              )}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={addProduct}
          disabled={!selected}
          className="rounded-xl bg-yellow-600 px-6 font-bold text-white hover:bg-yellow-500 disabled:opacity-50"
        >
          Agregar
        </button>

      </div>

    </div>
  );
}
