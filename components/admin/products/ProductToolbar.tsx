"use client";

import { Search } from "lucide-react";

interface ProductToolbarProps {
  onNewProduct: () => void;
  onSearch?: (value: string) => void;
  search?: string;
  onImportProducts?: () => void;
}

export default function ProductToolbar({
  onNewProduct,
  onSearch,
  search,
  onImportProducts,
}: ProductToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:gap-4 lg:mb-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
        />

        <input
          type="text"
          placeholder="Buscar producto..."
          value={search ?? ""}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-yellow-500 sm:text-base"
        />
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        <button
          onClick={onImportProducts}
          className="w-full rounded-xl border border-yellow-500 bg-neutral-900 px-5 py-3 text-sm font-bold text-yellow-500 transition hover:bg-neutral-800 sm:text-base lg:w-auto"
        >
          Importar productos
        </button>

        <button
          onClick={onNewProduct}
          className="w-full rounded-xl bg-yellow-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-yellow-500 sm:text-base lg:w-auto"
        >
          + Nuevo Producto
        </button>
      </div>
    </div>
  );
}