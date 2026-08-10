"use client";

import type { ComponentProps } from "react";
import ProductForm from "../products/form/ProductForm";

type ProductFormProduct = NonNullable<ComponentProps<typeof ProductForm>["product"]>;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  strength?: string;
  origin?: string;
  size?: string;
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

  const formProduct: ProductFormProduct | null = product
    ? {
        ...product,
        strength: product.strength ?? "",
        origin: product.origin ?? "",
        size: product.size ?? "",
      }
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-8">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-neutral-950 p-4 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
          <h1 className="text-2xl font-bold text-yellow-500 sm:text-3xl">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h1>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-500 sm:px-4"
          >
            ✕
          </button>
        </div>

        <ProductForm
          key={product?.id ?? "new-product"}
          product={formProduct}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
