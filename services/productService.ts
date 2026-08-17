import { prisma } from "@/lib/prisma";
import type { Product as PrismaProduct } from "@prisma/client";
import type { Product } from "@/types/product";
import { createProductDuplicateKey, normalizeTextValue } from "@/lib/import/productsImport";

function toProduct(product: PrismaProduct): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image,
    category: product.category,
    strength: product.strength,
    origin: product.origin,
    size: product.size,
    featured: product.featured,
  };
}

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(toProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(toProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product ? toProduct(product) : null;
}

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  strength: string;
  origin: string;
  size: string;
  featured: boolean;
}) {
  const product = await prisma.product.create({
    data,
  });

  return toProduct(product);
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    strength: string;
    origin: string;
    size: string;
    featured: boolean;
  }
) {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data,
  });

  return toProduct(product);
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
}

export async function importProducts(rows: {
  name: string;
  description: string;
  category: string;
  strength: string;
  origin: string;
  size: string;
  price: number;
  stock: number;
  featured: boolean;
}[]): Promise<{ importedCount: number }> {
  if (!Array.isArray(rows)) {
    throw new Error("Invalid payload: products must be an array");
  }

  if (rows.length === 0) {
    return { importedCount: 0 };
  }

  if (rows.length > 1000) {
    throw new Error("Too many products. Maximum 1000 allowed.");
  }

  // Normalize duplicate key for each row
  const payloadKeys: string[] = rows.map((r) =>
    createProductDuplicateKey({
      name: r.name,
      category: r.category,
      strength: r.strength,
      origin: r.origin,
      size: r.size,
    })
  );

  // Detect duplicates inside payload
  const seen = new Set<string>();
  const duplicatePayloadIndices: number[] = [];
  payloadKeys.forEach((key, idx) => {
    if (seen.has(key)) {
      duplicatePayloadIndices.push(idx);
    } else {
      seen.add(key);
    }
  });

  if (duplicatePayloadIndices.length > 0) {
    const messages = duplicatePayloadIndices.map((i) => {
      const r = rows[i];
      return `Producto duplicado en payload: ${r.name} / ${r.category} / ${r.strength} / ${r.origin} / ${r.size}`;
    });
    const err = new Error("Duplicate in payload") as Error & { rejectedRows?: string[] };
    err.rejectedRows = messages;
    throw err;
  }

  // Check duplicates against DB
  const whereOr = rows.map((r) => ({
    name: r.name,
    category: r.category,
    strength: r.strength,
    origin: r.origin,
    size: r.size,
  }));

  const existing = await prisma.product.findMany({
    where: {
      OR: whereOr,
    },
    select: {
      name: true,
      category: true,
      strength: true,
      origin: true,
      size: true,
    },
  });

  if (existing.length > 0) {
    const messages = existing.map((e) =>
      `Producto ya existe en el sistema: ${e.name} / ${e.category} / ${e.strength} / ${e.origin} / ${e.size}`
    );
    const err = new Error("Duplicate in DB") as Error & { rejectedRows?: string[] };
    err.rejectedRows = messages;
    throw err;
  }

  // Prepare data for insertion
  const defaultImage = "/images/products/robusto.jpg";

  const createData = rows.map((r) => ({
    name: normalizeTextValue(r.name),
    description: r.description ?? "",
    price: Number(r.price),
    stock: Number(r.stock),
    image: defaultImage,
    category: normalizeTextValue(r.category),
    strength: normalizeTextValue(r.strength),
    origin: normalizeTextValue(r.origin),
    size: normalizeTextValue(r.size),
    featured: !!r.featured,
  }));

  // Transactional createMany
  const result = await prisma.$transaction(async (tx) => {
    const createManyResult = await tx.product.createMany({
      data: createData,
    });

    return createManyResult;
  });

  // createMany returns { count } in modern Prisma
  const createManyResult = result as { count?: number };
  const importedCount = createManyResult.count ?? 0;

  return { importedCount };
}
