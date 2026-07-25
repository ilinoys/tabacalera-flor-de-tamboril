"use client";

import {
  Eye,
  Pencil,
  Trash2,
  Copy,
} from "lucide-react";

interface Props {
  onView: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function QuotationActions({
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}: Props) {
  return (
    <div className="flex justify-center gap-2">

      <button
        onClick={onView}
        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-500"
      >
        <Eye size={18} />
      </button>

      <button
        onClick={onEdit}
        className="rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-500"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDuplicate}
        className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-500"
      >
        <Copy size={18} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}