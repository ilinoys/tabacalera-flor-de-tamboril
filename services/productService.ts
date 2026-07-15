import { prisma } from "@/lib/prisma";
import type { Product as PrismaProduct } from "@prisma/client";
import type { Product } from "@/types/product";

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
