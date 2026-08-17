import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createProductDuplicateKey } from "@/lib/import/productsImport";
import type { Product as PrismaProduct } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.products)) {
      return NextResponse.json({ success: false, message: "Payload inválido" }, { status: 400 });
    }

    const products = body.products as Array<{
      rowIndex: number;
      name: string;
      category: string;
      strength: string;
      origin: string;
      size: string;
    }>;

    if (products.length === 0) {
      return NextResponse.json({ success: true, duplicates: [] }, { status: 200 });
    }

    // Build duplicate keys for the incoming rows
    const incomingKeys = products.map((p) => ({ key: createProductDuplicateKey(p), rowIndex: p.rowIndex, data: p }));

    // Fetch candidate products from DB that match any of the incoming combinations using OR on fields
    const whereOr = products.map((p) => ({
      name: p.name,
      category: p.category,
      strength: p.strength,
      origin: p.origin,
      size: p.size,
    }));

    const existing = await prisma.product.findMany({
      where: { OR: whereOr },
      select: { name: true, category: true, strength: true, origin: true, size: true },
    });

    // Create keys for existing
    const existingKeys = new Map<string, PrismaProduct>();
    for (const e of existing) {
      const key = createProductDuplicateKey(e as PrismaProduct);
      existingKeys.set(key, e as PrismaProduct);
    }

    const duplicates: Array<{ rowIndex: number; message: string }> = [];

    for (const inc of incomingKeys) {
      if (existingKeys.has(inc.key)) {
        const e = existingKeys.get(inc.key)!;
        const message = `Producto ya existe en el sistema: ${e.name} / ${e.category} / ${e.strength} / ${e.origin} / ${e.size}`;
        duplicates.push({ rowIndex: inc.rowIndex, message });
      }
    }

    return NextResponse.json({ success: true, duplicates }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
