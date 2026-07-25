"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteQuotationModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-8">

        <h2 className="text-2xl font-bold text-white">
          Eliminar Cotización
        </h2>

        <p className="mt-4 text-neutral-400">
          Esta acción no se puede deshacer.
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-700 px-5 py-3 text-white"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-3 font-bold text-white"
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>
  );
}