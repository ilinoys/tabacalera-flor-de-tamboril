"use client";

interface Props {
  status: string;
}

const statusColors: Record<string, string> = {
  PENDIENTE: "bg-yellow-600",
  EN_REVISION: "bg-blue-600",
  COTIZADO: "bg-purple-600",
  CONFIRMADO: "bg-green-600",
  ENVIADO: "bg-cyan-600",
  ENTREGADO: "bg-emerald-600",
  CANCELADO: "bg-red-600",
};

export default function StatusCard({
  status,
}: Props) {
  return (
    <div className="mb-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-5 text-2xl font-bold text-yellow-500">
        Estado del Pedido
      </h2>

      <span
        className={`rounded-full px-5 py-3 font-bold text-white ${
          statusColors[status] ?? "bg-neutral-700"
        }`}
      >
        {status}
      </span>

    </div>
  );
}