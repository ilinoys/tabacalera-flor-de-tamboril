"use client";

import { Plus, Search } from "lucide-react";

interface RawMaterialToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewRawMaterial: () => void;
}

export default function RawMaterialToolbar({
  search,
  onSearchChange,
  onNewRawMaterial,
}: RawMaterialToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar materia prima..."
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-yellow-500"
        />
      </div>

      <button
        onClick={onNewRawMaterial}
        className="flex items-center justify-center gap-2 rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white transition hover:bg-yellow-500"
      >
        <Plus size={18} />
        Nueva Materia Prima
      </button>
    </div>
  );
}
