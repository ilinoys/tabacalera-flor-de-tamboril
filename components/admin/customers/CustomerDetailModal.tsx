"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CustomerDetailModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-4xl rounded-2xl bg-neutral-900 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Detalle del Cliente
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Cerrar
          </button>

        </div>

        <div className="rounded-xl border border-neutral-800 bg-black p-6">

          <p className="text-neutral-400">
            Esta vista mostrará:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-white">
            <li>Información del cliente</li>
            <li>Historial de pedidos</li>
            <li>Historial de cotizaciones</li>
            <li>Estadísticas</li>
            <li>Notas</li>
          </ul>

        </div>

      </div>

    </div>
  );
}