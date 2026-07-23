"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import type { RawMaterial } from "./types";

interface RawMaterialTableProps {
  search: string;
  refreshKey: number;
  onEdit: (rawMaterial: RawMaterial) => void;
}

const PAGE_SIZE = 8;

async function fetchRawMaterials() {
  const response = await fetch("/api/materias-primas");

  if (!response.ok) {
    throw new Error("No se pudieron cargar las materias primas");
  }

  return response.json() as Promise<RawMaterial[]>;
}

function formatMoney(value: number) {
  return `US$ ${value.toFixed(2)}`;
}

function getStatusLabel(status: RawMaterial["status"]) {
  return status === "ACTIVE" ? "Activo" : "Inactivo";
}

export default function RawMaterialTable({
  search,
  refreshKey,
  onEdit,
}: RawMaterialTableProps) {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  async function loadRawMaterials() {
    try {
      setLoading(true);
      const data = await fetchRawMaterials();

      setRawMaterials(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(rawMaterial: RawMaterial) {
    const confirmed = confirm(
      `Seguro que deseas eliminar ${rawMaterial.name}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/materias-primas/${rawMaterial.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar");
      }

      await loadRawMaterials();

      alert("Materia prima eliminada");
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la materia prima");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadInitialRawMaterials() {
      try {
        setLoading(true);
        const data = await fetchRawMaterials();

        if (!cancelled) {
          setRawMaterials(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInitialRawMaterials();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const filteredRawMaterials = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return rawMaterials;

    return rawMaterials.filter((rawMaterial) =>
      [
        rawMaterial.code,
        rawMaterial.name,
        rawMaterial.category,
        rawMaterial.unit,
        rawMaterial.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [rawMaterials, search]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredRawMaterials.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, pageCount);

  const paginatedRawMaterials = filteredRawMaterials.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center text-white">
        Cargando materias primas...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        <table className="w-full">
          <thead className="bg-neutral-950">
            <tr>
              <th className="p-4 text-left text-yellow-500">Codigo</th>
              <th className="p-4 text-left text-yellow-500">Nombre</th>
              <th className="p-4 text-left text-yellow-500">Categoria</th>
              <th className="p-4 text-left text-yellow-500">Unidad</th>
              <th className="p-4 text-left text-yellow-500">Stock</th>
              <th className="p-4 text-left text-yellow-500">Minimo</th>
              <th className="p-4 text-left text-yellow-500">Costo</th>
              <th className="p-4 text-left text-yellow-500">Estado</th>
              <th className="p-4 text-center text-yellow-500">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRawMaterials.map((rawMaterial) => {
              const lowStock =
                rawMaterial.currentStock <=
                rawMaterial.minimumStock;

              return (
                <tr
                  key={rawMaterial.id}
                  className="border-t border-neutral-800 hover:bg-neutral-800/40"
                >
                  <td className="p-4 font-semibold text-white">
                    {rawMaterial.code}
                  </td>

                  <td className="p-4 text-white">
                    {rawMaterial.name}
                  </td>

                  <td className="p-4 text-neutral-300">
                    {rawMaterial.category}
                  </td>

                  <td className="p-4 text-neutral-300">
                    {rawMaterial.unit}
                  </td>

                  <td
                    className={`p-4 ${
                      lowStock ? "text-red-400" : "text-white"
                    }`}
                  >
                    {rawMaterial.currentStock}
                  </td>

                  <td className="p-4 text-neutral-300">
                    {rawMaterial.minimumStock}
                  </td>

                  <td className="p-4 text-yellow-500">
                    {formatMoney(rawMaterial.cost)}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-white">
                      {getStatusLabel(rawMaterial.status)}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(rawMaterial)}
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-500"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          void handleDelete(rawMaterial);
                        }}
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredRawMaterials.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="p-8 text-center text-neutral-400"
                >
                  No hay materias primas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-neutral-400">
        <span>
          Pagina {currentPage} de {pageCount}
        </span>

        <div className="flex gap-3">
          <button
            onClick={() => setPage((current) => current - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-neutral-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <button
            onClick={() => setPage((current) => current + 1)}
            disabled={currentPage === pageCount}
            className="rounded-lg border border-neutral-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
