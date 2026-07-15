"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditQuotationModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-5xl rounded-2xl bg-neutral-900 p-8">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Editar Cotización
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Cerrar
          </button>

        </div>

        <div className="mt-8 rounded-xl border border-dashed border-neutral-700 p-12 text-center text-neutral-400">

          Aquí editaremos la cotización completa en el siguiente sprint.

        </div>

      </div>

    </div>
  );
}