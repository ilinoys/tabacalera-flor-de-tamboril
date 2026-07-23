"use client";

import { useState } from "react";

import type {
  RawMaterial,
  RawMaterialFormData,
} from "./types";

interface RawMaterialFormProps {
  rawMaterial?: RawMaterial | null;
  onSuccess?: () => void;
}

const emptyRawMaterial: RawMaterialFormData = {
  code: "",
  name: "",
  description: "",
  category: "",
  unit: "",
  currentStock: "",
  minimumStock: "",
  cost: "",
  status: "ACTIVE",
};

function getInitialRawMaterial(
  rawMaterial?: RawMaterial | null
): RawMaterialFormData {
  if (!rawMaterial) return emptyRawMaterial;

  return {
    code: rawMaterial.code,
    name: rawMaterial.name,
    description: rawMaterial.description ?? "",
    category: rawMaterial.category,
    unit: rawMaterial.unit,
    currentStock: rawMaterial.currentStock.toString(),
    minimumStock: rawMaterial.minimumStock.toString(),
    cost: rawMaterial.cost.toString(),
    status: rawMaterial.status,
  };
}

export default function RawMaterialForm({
  rawMaterial: editingRawMaterial,
  onSuccess,
}: RawMaterialFormProps) {
  const [loading, setLoading] = useState(false);
  const [rawMaterial, setRawMaterial] = useState(
    () => getInitialRawMaterial(editingRawMaterial)
  );

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setRawMaterial((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingRawMaterial
        ? `/api/materias-primas/${editingRawMaterial.id}`
        : "/api/materias-primas";

      const response = await fetch(endpoint, {
        method: editingRawMaterial ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawMaterial),
      });

      if (!response.ok) {
        const result = await response.json();

        throw new Error(
          result.error ?? "Error al guardar materia prima"
        );
      }

      alert(
        editingRawMaterial
          ? "Materia prima actualizada correctamente"
          : "Materia prima guardada correctamente"
      );

      setRawMaterial(emptyRawMaterial);
      onSuccess?.();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Error al guardar materia prima"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="code"
            value={rawMaterial.code}
            onChange={handleChange}
            placeholder="Codigo"
            required
            className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

          <input
            name="name"
            value={rawMaterial.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
            className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

          <input
            name="category"
            value={rawMaterial.category}
            onChange={handleChange}
            placeholder="Categoria"
            required
            className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

          <input
            name="unit"
            value={rawMaterial.unit}
            onChange={handleChange}
            placeholder="Unidad"
            required
            className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

          <input
            name="currentStock"
            type="number"
            min="0"
            step="0.01"
            value={rawMaterial.currentStock}
            onChange={handleChange}
            placeholder="Stock Inicial"
            required
            className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

          <input
            name="minimumStock"
            type="number"
            min="0"
            step="0.01"
            value={rawMaterial.minimumStock}
            onChange={handleChange}
            placeholder="Stock Minimo"
            required
            className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

          <input
            name="cost"
            type="number"
            min="0"
            step="0.01"
            value={rawMaterial.cost}
            onChange={handleChange}
            placeholder="Costo"
            required
            className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
          />

          <select
            name="status"
            value={rawMaterial.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
          >
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
          </select>
        </div>

        <textarea
          name="description"
          value={rawMaterial.description}
          onChange={handleChange}
          placeholder="Descripcion"
          rows={4}
          className="mt-4 w-full rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onSuccess}
          className="rounded-xl border border-neutral-700 px-6 py-3 text-white"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500 disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : editingRawMaterial
              ? "Actualizar Materia Prima"
              : "Guardar Materia Prima"}
        </button>
      </div>
    </form>
  );
}
