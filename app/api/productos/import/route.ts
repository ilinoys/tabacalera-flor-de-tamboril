import { NextRequest, NextResponse } from "next/server";
import { importProducts } from "@/services/productService";
import type { ProductImportRow } from "@/types/product";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !Array.isArray(body.products)) {
      return NextResponse.json(
        {
          success: false,
          importedCount: 0,
          errorsCount: 1,
          rejectedRows: ["Payload inválido: se requiere products: ProductImportRow[]"],
        },
        { status: 400 }
      );
    }

    const products = body.products as ProductImportRow[];

    if (products.length === 0) {
      return NextResponse.json(
        {
          success: true,
          importedCount: 0,
          errorsCount: 0,
          rejectedRows: [],
        },
        { status: 200 }
      );
    }

    if (products.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          importedCount: 0,
          errorsCount: 1,
          rejectedRows: ["Demasiados productos en payload. Máximo 1000."],
        },
        { status: 400 }
      );
    }

    // Server-side validation: minimal structural checks
    const invalidRows: string[] = [];
    for (let i = 0; i < products.length; i++) {
      const p = products[i] as Partial<ProductImportRow>;
      if (!p || typeof p.name !== "string" || (String(p.name).trim() === "")) {
        invalidRows.push(`Fila payload ${i + 1}: Nombre inválido o vacío.`);
      }
      if (p.price === undefined || typeof p.price !== "number" || !(isFinite(p.price) && p.price > 0)) {
        invalidRows.push(`Fila payload ${i + 1}: Precio inválido.`);
      }
      if (
        p.stock === undefined ||
        typeof p.stock !== "number" ||
        !Number.isInteger(p.stock) ||
        p.stock < 0
      ) {
        invalidRows.push(`Fila payload ${i + 1}: Stock inválido.`);
      }
    }

    if (invalidRows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          importedCount: 0,
          errorsCount: invalidRows.length,
          rejectedRows: invalidRows,
        },
        { status: 400 }
      );
    }

    try {
      const result = await importProducts(products);

      return NextResponse.json(
        {
          success: true,
          importedCount: result.importedCount,
          errorsCount: 0,
          rejectedRows: [],
        },
        { status: 200 }
      );
    } catch (err: unknown) {
      // If our service attached rejectedRows to the error, return them
      type ErrWithRejected = { rejectedRows?: string[]; message?: string };
      const e = err as ErrWithRejected;
      const rejected = Array.isArray(e.rejectedRows) ? e.rejectedRows : ["Error al procesar la importación."];

      const status = typeof e.message === "string" && (e.message.includes("Duplicate") || e.message.includes("Invalid")) ? 400 : 500;

      return NextResponse.json(
        {
          success: false,
          importedCount: 0,
          errorsCount: rejected.length,
          rejectedRows: rejected,
        },
        { status }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, importedCount: 0, errorsCount: 1, rejectedRows: ["Error interno del servidor."] },
      { status: 500 }
    );
  }
}
