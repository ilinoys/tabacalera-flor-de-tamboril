import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
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
  return await prisma.product.create({
    data,
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
}