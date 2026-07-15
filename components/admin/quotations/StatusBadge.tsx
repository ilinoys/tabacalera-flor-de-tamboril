"use client";

interface Props {
  status: string;
}

const colors: Record<string, string> = {
  BORRADOR: "bg-gray-600",
  ENVIADA: "bg-blue-600",
  ACEPTADA: "bg-green-600",
  RECHAZADA: "bg-red-600",
  EXPIRADA: "bg-orange-600",
};

export default function StatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-bold text-white ${
        colors[status] ?? "bg-neutral-700"
      }`}
    >
      {status}
    </span>
  );
}