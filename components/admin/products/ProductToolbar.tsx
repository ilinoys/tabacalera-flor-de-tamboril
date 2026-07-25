"use client";

import { Search } from "lucide-react";

interface ProductToolbarProps {
  onNewProduct: () => void;
}

export default function ProductToolbar({
  onNewProduct,
}: ProductToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
        />

        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-yellow-500"
        />
      </div>

      <button
        onClick={onNewProduct}
        className="rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white transition hover:bg-yellow-500"
      >
        + Nuevo Producto
      </button>
    </div>
  );
}