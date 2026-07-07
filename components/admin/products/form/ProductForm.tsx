"use client";

import Image from "next/image";
import { useState } from "react";
import { useProductStore } from "@/store/productStore";

interface ProductFormProps {
  onSuccess?: () => void;
}

export default function ProductForm({
  onSuccess,
}: ProductFormProps) {
  const addProduct = useProductStore((state) => state.addProduct);

  const [preview, setPreview] = useState("/images/products/robusto.jpg");

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

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!product.name.trim()) {
      alert("Debes escribir un nombre.");
      return;
    }

    addProduct({
      id: crypto.randomUUID(),
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: Number(product.stock),
      image: preview,
      category: product.category,
      strength: "Medio",
      origin: "República Dominicana",
      size: '5" x 50',
      featured: false,
    });

    setProduct({
      name: "",
      description: "",
      category: "Premium",
      price: "",
      stock: "",
    });

    setPreview("/images/products/robusto.jpg");

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

        <h2 className="mb-6 text-2xl font-bold text-yellow-500">
          Nuevo Producto
        </h2>

        <div className="mb-6 flex justify-center">

          <Image
            src={preview}
            alt="Vista previa"
            width={180}
            height={180}
            className="rounded-xl border border-neutral-700 object-cover"
          />

        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mb-6 w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

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
          rows={4}
          placeholder="Descripción"
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

        <div className="grid gap-4 md:grid-cols-2">

          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="Precio"
            className="rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

          <input
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

        </div>

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
          className="rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500"
        >
          Guardar Producto
        </button>

      </div>

    </form>
  );
}