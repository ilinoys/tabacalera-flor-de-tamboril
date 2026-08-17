import type {
  ProductImportRow,
  ProductImportSummary,
  ProductImportValidationResult,
} from "@/types/product";

const PRODUCT_IMPORT_FIELD_ORDER = [
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

function normalizeText(value: unknown): string {
  const text = String(value ?? "").trim();
  return text.replace(/\s+/g, " ");
}

function normalizeTextForComparison(value: unknown): string {
  return normalizeText(value).toLowerCase();
}

function rowIndexFromArrayIndex(index: number): number {
  return index + 2;
}

function getFieldValue(
  row: Record<string, unknown> | unknown[],
  fieldName: string
): unknown {
  if (Array.isArray(row)) {
    const index = PRODUCT_IMPORT_FIELD_ORDER.indexOf(
      fieldName as (typeof PRODUCT_IMPORT_FIELD_ORDER)[number]
    );
    return index >= 0 ? row[index] : undefined;
  }

  const direct = row[fieldName];
  if (direct !== undefined) {
    return direct;
  }

  const loweredKey = fieldName.toLowerCase();
  const entry = Object.entries(row).find(
    ([key]) => key.toLowerCase() === loweredKey
  );

  return entry ? entry[1] : undefined;
}

function isEmptyRow(row: Record<string, unknown> | unknown[]): boolean {
  if (Array.isArray(row)) {
    return row.every((cell) => {
      if (cell === undefined || cell === null) return true;
      return normalizeText(cell) === "";
    });
  }

  return PRODUCT_IMPORT_FIELD_ORDER.every((field) => {
    const value = getFieldValue(row, field);
    return value === undefined || value === null || normalizeText(value) === "";
  });
}

export function normalizeTextValue(value: unknown): string {
  return normalizeText(value);
}

export function parseFeatured(
  value: unknown
): { value: boolean } | { error: string } {
  const text = normalizeText(value);

  if (text === "") {
    return { value: false };
  }

  const normalizedValue = text.toLowerCase();

  if (["true", "1", "yes", "sí", "si"].includes(normalizedValue)) {
    return { value: true };
  }

  if (["false", "0", "no"].includes(normalizedValue)) {
    return { value: false };
  }

  return {
    error: "Valor de destacado inválido. Usa Sí/No, true/false, 1/0.",
  };
}

export function parsePrice(
  value: unknown
): { value: number } | { error: string } {
  if (value === undefined || value === null || normalizeText(value) === "") {
    return { error: "Precio obligatorio." };
  }

  const raw = normalizeText(value).replace(/\s+/g, "");

  if (raw === "") {
    return { error: "Precio obligatorio." };
  }

  const normalized = raw.replace(/\$/g, "").replace(/[^0-9,.-]/g, "");

  if (normalized === "" || Number.isNaN(Number(normalized.replace(",", ".")))) {
    return {
      error: "Precio inválido. Debe ser un número mayor que 0.",
    };
  }

  let parsed: number;

  if (normalized.includes(",") && normalized.includes(".")) {
    const lastCommaIndex = normalized.lastIndexOf(",");
    const lastDotIndex = normalized.lastIndexOf(".");

    if (lastCommaIndex > lastDotIndex) {
      parsed = Number(normalized.replace(/\./g, "").replace(",", "."));
    } else {
      parsed = Number(normalized.replace(/,/g, ""));
    }
  } else if (normalized.includes(",")) {
    parsed = Number(normalized.replace(",", "."));
  } else {
    parsed = Number(normalized);
  }

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return {
      error: "Precio inválido. Debe ser un número mayor que 0.",
    };
  }

  return { value: parsed };
}

export function parseStock(
  value: unknown
): { value: number } | { error: string } {
  if (value === undefined || value === null || normalizeText(value) === "") {
    return { error: "Stock obligatorio." };
  }

  const raw = normalizeText(value).replace(/\s+/g, "");
  const sanitized = raw.replace(/[^0-9.-]/g, "");

  if (sanitized === "" || Number.isNaN(Number(sanitized))) {
    return {
      error: "Stock inválido. Debe ser un número entero.",
    };
  }

  const parsed = Number(sanitized);

  if (!Number.isFinite(parsed)) {
    return {
      error: "Stock inválido. Debe ser un número entero.",
    };
  }

  if (!Number.isInteger(parsed)) {
    return {
      error: "Stock inválido. Debe ser un número entero.",
    };
  }

  if (parsed < 0) {
    return {
      error: "Stock inválido. No puede ser negativo.",
    };
  }

  return { value: parsed };
}

export function createProductDuplicateKey(data: {
  name: string;
  category: string;
  strength: string;
  origin: string;
  size: string;
}): string {
  return [
    normalizeTextForComparison(data.name),
    normalizeTextForComparison(data.category),
    normalizeTextForComparison(data.strength),
    normalizeTextForComparison(data.origin),
    normalizeTextForComparison(data.size),
  ].join("|");
}

export function validateProductImportRows(
  rows: Array<Record<string, unknown> | unknown[]>
): ProductImportValidationResult[] {
  const results: ProductImportValidationResult[] = [];
  const seenKeys = new Set<string>();

  rows.forEach((row, index) => {
    const rowIndex = rowIndexFromArrayIndex(index);
    const rowRecord = Array.isArray(row) ? row : row;

    if (isEmptyRow(rowRecord)) {
      results.push({
        rowIndex,
        status: "error",
        normalizedData: null,
        errors: [`Fila ${rowIndex}: Fila vacía.`],
      });
      return;
    }

    const errors: string[] = [];

    const name = normalizeText(getFieldValue(rowRecord, "name"));
    const description = normalizeText(getFieldValue(rowRecord, "description"));
    const category = normalizeText(getFieldValue(rowRecord, "category"));
    const strength = normalizeText(getFieldValue(rowRecord, "strength"));
    const origin = normalizeText(getFieldValue(rowRecord, "origin"));
    const size = normalizeText(getFieldValue(rowRecord, "size"));

    if (!name) {
      errors.push(`Fila ${rowIndex}: Nombre obligatorio.`);
    }

    if (!category) {
      errors.push(`Fila ${rowIndex}: Categoría obligatoria.`);
    }

    if (!strength) {
      errors.push(`Fila ${rowIndex}: Fortaleza obligatoria.`);
    }

    if (!origin) {
      errors.push(`Fila ${rowIndex}: Origen obligatorio.`);
    }

    if (!size) {
      errors.push(`Fila ${rowIndex}: Tamaño/Vitola obligatorio.`);
    }

    const priceRaw = getFieldValue(rowRecord, "price");
    const stockRaw = getFieldValue(rowRecord, "stock");

    let priceValue: number | null = null;
    let stockValue: number | null = null;

    if (
      priceRaw === undefined ||
      priceRaw === null ||
      normalizeText(priceRaw) === ""
    ) {
      errors.push(`Fila ${rowIndex}: Precio obligatorio.`);
    } else {
      const priceResult = parsePrice(priceRaw);
      if ("error" in priceResult) {
        errors.push(`Fila ${rowIndex}: ${priceResult.error}`);
      } else {
        priceValue = priceResult.value;
      }
    }

    if (
      stockRaw === undefined ||
      stockRaw === null ||
      normalizeText(stockRaw) === ""
    ) {
      errors.push(`Fila ${rowIndex}: Stock obligatorio.`);
    } else {
      const stockResult = parseStock(stockRaw);
      if ("error" in stockResult) {
        errors.push(`Fila ${rowIndex}: ${stockResult.error}`);
      } else {
        stockValue = stockResult.value;
      }
    }

    const featuredValue = getFieldValue(rowRecord, "featured");
    let featured = false;
    if (featuredValue !== undefined && featuredValue !== null && normalizeText(featuredValue) !== "") {
      const featuredResult = parseFeatured(featuredValue);
      if ("error" in featuredResult) {
        errors.push(
          `Fila ${rowIndex}: Valor de destacado inválido. Usa Sí/No, true/false, 1/0.`
        );
      } else {
        featured = featuredResult.value;
      }
    }

    const normalizedData: ProductImportRow | null =
      name && category && strength && origin && size && priceValue !== null && stockValue !== null
        ? {
            name,
            description,
            category,
            strength,
            origin,
            size,
            price: priceValue,
            stock: stockValue,
            featured,
          }
        : null;

    if (normalizedData) {
      const duplicateKey = createProductDuplicateKey(normalizedData);
      if (seenKeys.has(duplicateKey)) {
        errors.push(`Fila ${rowIndex}: Producto duplicado dentro del archivo.`);
      } else {
        seenKeys.add(duplicateKey);
      }
    }

    if (errors.length > 0) {
      const duplicateErrors = errors.filter((error) =>
        error.includes("duplicado")
      );
      const status: ProductImportValidationResult["status"] =
        duplicateErrors.length > 0 ? "duplicate" : "error";

      results.push({
        rowIndex,
        status,
        normalizedData,
        errors,
      });
      return;
    }

    results.push({
      rowIndex,
      status: "valid",
      normalizedData,
      errors: [],
    });
  });

  return results;
}

export function createProductImportSummary(
  results: ProductImportValidationResult[]
): ProductImportSummary {
  const validProducts = results
    .filter((result) => result.status === "valid" && result.normalizedData)
    .map((result) => result.normalizedData as ProductImportRow);

  return {
    totalRows: results.length,
    validRows: validProducts.length,
    errorRows: results.filter((result) => result.status === "error").length,
    duplicateRows: results.filter((result) => result.status === "duplicate").length,
    validProducts,
  };
}
