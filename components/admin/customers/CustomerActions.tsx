"use client";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CustomerActions({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex justify-center gap-2">

      <button
        title="Ver"
        onClick={onView}
        className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-500"
      >
        <Eye size={18} />
      </button>

      <button
        title="Editar"
        onClick={onEdit}
        className="rounded-lg bg-yellow-600 p-2 text-white transition hover:bg-yellow-500"
      >
        <Pencil size={18} />
      </button>

      <button
        title="Eliminar"
        onClick={onDelete}
        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-500"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}