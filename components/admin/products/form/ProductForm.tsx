"use client";

import { useState } from "react";

interface ProductFormProps {
  onSuccess?: () => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "Premium",
    price: "",
    stock: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Error al guardar");
      }

      alert("✅ Producto guardado correctamente");

      setProduct({
        name: "",
        description: "",
        category: "Premium",
        price: "",
        stock: "",
      });

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="mb-4 w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Descripción"
          rows={5}
          className="mb-4 w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="mb-4 w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
        >
          <option>Premium</option>
          <option>Clásica</option>
          <option>Edición Especial</option>
        </select>

        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Precio"
          className="mb-4 w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <input
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

      </div>

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={onSuccess}
          className="rounded-xl border border-neutral-700 px-6 py-3 text-white"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar Producto"}
        </button>

      </div>
    </form>
  );
}