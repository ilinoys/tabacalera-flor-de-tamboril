"use client";

import ProductForm from "../products/form/ProductForm";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductModal({
  open,
  onClose,
  product,
}: ProductModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-8">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-neutral-950 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-3xl font-bold text-yellow-500">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h1>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            ✕
          </button>

        </div>

        <ProductForm
          key={product?.id ?? "new-product"}
          product={product}
          onSuccess={onClose}
        />

      </div>
    </div>
  );
}
