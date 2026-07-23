"use client";

import RawMaterialForm from "./RawMaterialForm";
import type { RawMaterial } from "./types";

interface RawMaterialModalProps {
  open: boolean;
  onClose: () => void;
  rawMaterial?: RawMaterial | null;
}

export default function RawMaterialModal({
  open,
  onClose,
  rawMaterial,
}: RawMaterialModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-8">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-neutral-950 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-yellow-500">
            {rawMaterial
              ? "Editar Materia Prima"
              : "Nueva Materia Prima"}
          </h1>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            x
          </button>
        </div>

        <RawMaterialForm
          key={rawMaterial?.id ?? "new-raw-material"}
          rawMaterial={rawMaterial}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
