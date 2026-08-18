"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";

import {
  createProductImportSummary,
  validateProductImportRows,
} from "@/lib/import/productsImport";
import type {
  ProductImportRow,
  ProductImportValidationResult,
  ProductImportStatus,
} from "@/types/product";

const EXPECTED_HEADERS = [
  "name",
  "description",
  "category",
  "strength",
  "origin",
  "size",
  "price",
  "stock",
  "featured",
] as const;

const TEMPLATE_ROWS: Record<string, string>[] = [
  {
    name: "Robusto Selección",
    description: "Cigarro de cuerpo medio con notas de cacao y especias.",
    category: "Premium",
    strength: "Medio",
    origin: "República Dominicana",
    size: "5 x 50",
    price: "29.99",
    stock: "120",
    featured: "Sí",
  },
  {
    name: "La Flor Antigua",
    description: "Perfil equilibrado con aromas a madera y tabaco seco.",
    category: "Clásica",
    strength: "Medio",
    origin: "Nicaragua",
    size: "6 x 52",
    price: "34.50",
    stock: "85",
    featured: "No",
  },
  {
    name: "Casa del Sol",
    description: "Aromas a tierra y nuez con final suave.",
    category: "Premium",
    strength: "Fuerte",
    origin: "República Dominicana",
    size: "5 x 54",
    price: "39.99",
    stock: "70",
    featured: "Sí",
  },
];

interface ImportProductsModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (importedCount: number) => void;
}

function normalizeRowObject(
  raw: Record<string, unknown>
): Record<string, string> {
  const normalized: Record<string, string> = {};

  for (const [key, value] of Object.entries(raw)) {
    normalized[key.trim().toLowerCase()] = String(value ?? "").trim();
  }

  return normalized;
}

function downloadTemplateFile() {
  const worksheet = XLSX.utils.json_to_sheet(TEMPLATE_ROWS);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
  XLSX.writeFile(workbook, "plantilla-productos.xlsx");
}

export default function ImportProductsModal({
  open,
  onClose,
  onSuccess,
}: ImportProductsModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [previewRows, setPreviewRows] = useState<ProductImportValidationResult[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [duplicatesChecked, setDuplicatesChecked] = useState(false);

  const summary = useMemo(
    () => createProductImportSummary(previewRows),
    [previewRows]
  );

  const hasBlockingIssues =
    previewRows.some((row) => row.status === "error" || row.status === "duplicate") ||
    summary.validRows === 0;

  const canImport = previewRows.length > 0 && !hasBlockingIssues;

  function resetFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorMessage("");
    setFileName(selectedFile.name);
    setPreviewRows([]);

    try {
      const fileNameLower = selectedFile.name.toLowerCase();
      const isSupported =
        fileNameLower.endsWith(".xlsx") ||
        fileNameLower.endsWith(".xls") ||
        fileNameLower.endsWith(".csv");

      if (!isSupported) {
        setErrorMessage("Selecciona un archivo Excel o CSV");
        setIsLoading(false);
        resetFileInput();
        return;
      }

      const fileReader = new FileReader();

      fileReader.onload = (loadEvent) => {
        try {
          const data = loadEvent.target?.result;
          if (!data) {
            throw new Error("No se pudo leer el archivo");
          }

          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const firstSheet = workbook.Sheets[firstSheetName];
          const rows = XLSX.utils.sheet_to_json(firstSheet, {
            raw: false,
            defval: "",
          }) as Array<Record<string, unknown>>;

          if (rows.length === 0) {
            setErrorMessage("El archivo no contiene filas de datos.");
            setIsLoading(false);
            return;
          }

          const headerRow = rows[0] as Record<string, unknown>;
          const headerValues = Object.keys(normalizeRowObject(headerRow));
          const expected = EXPECTED_HEADERS.map((header) => header.toLowerCase());
          const normalizedHeaderValues = headerValues.map((value) => value.toLowerCase());

          const hasValidHeaders =
            JSON.stringify(normalizedHeaderValues) === JSON.stringify(expected);

          if (!hasValidHeaders) {
            setErrorMessage(
              "Encabezados inválidos. Se esperaban: name, description, category, strength, origin, size, price, stock, featured."
            );
            setIsLoading(false);
            return;
          }

          const dataRows = rows.slice(1).map((row) => {
            const normalizedRow = normalizeRowObject(row);
            const flatRow: Record<string, string> = {};
 
            EXPECTED_HEADERS.forEach((header) => {
              flatRow[header] = normalizedRow[header] ?? "";
            });
 
            return flatRow;
          });
 
          const results = validateProductImportRows(dataRows);
          setPreviewRows(results);
          setDuplicatesChecked(false);
          setIsLoading(false);
        } catch (readError) {
          console.error(readError);
          setErrorMessage("No se pudo leer el archivo seleccionado.");
          setIsLoading(false);
        }
      };

      fileReader.onerror = () => {
        setErrorMessage("No se pudo leer el archivo seleccionado.");
        setIsLoading(false);
      };

      fileReader.readAsArrayBuffer(selectedFile);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudo procesar el archivo.");
      setIsLoading(false);
    }
  }

  function handleCancel() {
    setFileName("");
    setPreviewRows([]);
    setErrorMessage("");
    setIsLoading(false);
    setImportError(null);
    resetFileInput();
    onClose();
  }

  async function handleImport() {
    if (!canImport) return;

    setIsImporting(true);
    setImportError(null);

    try {
      const payload = {
        products: summary.validProducts,
      };

      const res = await fetch("/api/productos/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setImportError(
          data?.rejectedRows ? data.rejectedRows.join(" | ") : "Error al importar productos"
        );
        setIsImporting(false);
        return;
      }

      // Success
      const importedCount = data.importedCount ?? 0;

      alert(`✅ Se importaron ${importedCount} productos correctamente.`);

      // Notify parent to refresh list if provided
      onSuccess?.(importedCount);

      // Reset and close
      setFileName("");
      setPreviewRows([]);
      resetFileInput();
      setIsImporting(false);
      onClose();
    } catch (error) {
      console.error(error);
      setImportError("Error interno al importar productos.");
      setIsImporting(false);
    }
  }

  // After previewRows are set, check DB duplicates once
  useEffect(() => {
    async function checkDbDuplicates() {
      try {
        const validRows = previewRows.filter((r) => r.status === "valid" && r.normalizedData).map((r) => ({
          rowIndex: r.rowIndex,
          name: r.normalizedData!.name,
          category: r.normalizedData!.category,
          strength: r.normalizedData!.strength,
          origin: r.normalizedData!.origin,
          size: r.normalizedData!.size,
        }));

        if (validRows.length === 0) {
          setDuplicatesChecked(true);
          return;
        }

        const res = await fetch("/api/productos/import/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products: validRows }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          console.error("No se pudo verificar duplicados", data);
          setDuplicatesChecked(true);
          return;
        }

        const duplicates: Array<{ rowIndex: number; message: string }> = data.duplicates ?? [];

        if (duplicates.length === 0) {
          setDuplicatesChecked(true);
          return;
        }

        // Merge duplicates into previewRows
        const updated = previewRows.map((r) => {
          const dup = duplicates.find((d) => d.rowIndex === r.rowIndex);
          if (dup) {
            const errors = r.errors ? [...r.errors] : [];
            errors.push(dup.message);
            return { ...r, status: "duplicate" as ProductImportStatus, errors };
          }
          return r;
        });

        setPreviewRows(updated as ProductImportValidationResult[]);
        setDuplicatesChecked(true);
      } catch (error) {
        console.error(error);
        setDuplicatesChecked(true);
      }
    }

    if (!duplicatesChecked && previewRows.length > 0) {
      void checkDbDuplicates();
    }
  }, [previewRows, duplicatesChecked]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-8">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-yellow-500 sm:text-2xl">
              Importar productos
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Selecciona un archivo Excel o CSV para previsualizar los productos.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white hover:bg-red-500"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col h-full max-h-[82vh]">
          <div className="space-y-5 p-4 sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={downloadTemplateFile}
                className="rounded-xl bg-yellow-600 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-500"
              >
                Descargar plantilla
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-yellow-500 bg-neutral-900 px-4 py-2 text-sm font-bold text-yellow-500 hover:bg-neutral-800"
              >
                Seleccionar archivo
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileSelect}
              className="hidden"
            />

            {fileName && (
              <span className="text-sm text-neutral-300">Archivo: {fileName}</span>
            )}
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-700 bg-red-950/30 p-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          {!isLoading && previewRows.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Total de filas</p>
                <p className="mt-2 text-2xl font-bold text-white">{summary.totalRows}</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Filas válidas</p>
                <p className="mt-2 text-2xl font-bold text-green-400">{summary.validRows}</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Filas con errores</p>
                <p className="mt-2 text-2xl font-bold text-red-400">{summary.errorRows}</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                <p className="text-xs uppercase tracking-wide text-neutral-400">Filas duplicadas</p>
                <p className="mt-2 text-2xl font-bold text-amber-400">{summary.duplicateRows}</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
              Leyendo archivo y validando filas...
            </div>
          )}
 
          {!isLoading && previewRows.length > 0 && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900">
              <div className="overflow-x-auto">
                <div className="max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
                  <table className="min-w-[1100px] w-full text-left text-sm">
                <thead className="bg-neutral-900 text-yellow-500">
                  <tr>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Fila</th>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Fortaleza</th>
                    <th className="p-3">Origen</th>
                    <th className="p-3">Tamaño</th>
                    <th className="p-3">Precio</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Destacado</th>
                    <th className="p-3">Errores</th>
                  </tr>
                </thead>

                <tbody>
                  {previewRows.map((row) => {
                    const rowData = row.normalizedData as ProductImportRow | null;
                    const statusClass =
                      row.status === "valid"
                        ? "bg-green-950/40 text-green-200"
                        : row.status === "duplicate"
                          ? "bg-amber-950/40 text-amber-200"
                          : "bg-red-950/40 text-red-200";

                    return (
                      <tr
                        key={`${row.rowIndex}-${row.status}`}
                        className="border-t border-neutral-800 bg-neutral-950"
                      >
                        <td className="p-3">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-bold ${statusClass}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-3 text-white">{row.rowIndex}</td>
                        <td className="p-3 text-white">{rowData?.name ?? "—"}</td>
                        <td className="p-3 text-neutral-300">{rowData?.category ?? "—"}</td>
                        <td className="p-3 text-neutral-300">{rowData?.strength ?? "—"}</td>
                        <td className="p-3 text-neutral-300">{rowData?.origin ?? "—"}</td>
                        <td className="p-3 text-neutral-300">{rowData?.size ?? "—"}</td>
                        <td className="p-3 text-yellow-500">{rowData ? `RD$ ${rowData.price}` : "—"}</td>
                        <td className="p-3 text-white">{rowData?.stock ?? "—"}</td>
                        <td className="p-3 text-neutral-300">{rowData ? (rowData.featured ? "Sí" : "No") : "—"}</td>
                        <td className="p-3 text-red-200">
                          {row.errors.length > 0 ? row.errors.join(" | ") : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
                </div>
              </div>
            </div>
          )}
 
          <div className="flex flex-col gap-3 border-t border-neutral-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-bold text-white hover:bg-neutral-800"
            >
              Cancelar
            </button>
 
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={!canImport || isImporting}
                onClick={handleImport}
                className="rounded-xl bg-yellow-600 px-5 py-3 text-sm font-bold text-black disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
              >
                {isImporting ? "Importando..." : canImport ? `Importar ${summary.validRows} productos` : "Importación pendiente de conexión con el servidor."}
              </button>
 
              {isImporting && (
                <div className="text-sm text-neutral-300">Procesando...</div>
              )}
            </div>
 
            {importError && (
              <div className="mt-3 rounded-xl border border-red-700 bg-red-950/30 p-3 text-sm text-red-200">
                {importError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
