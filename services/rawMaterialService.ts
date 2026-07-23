import { prisma } from "@/lib/prisma";
import { RawMaterialStatus } from "@prisma/client";

export interface RawMaterialInput {
  code: string;
  name: string;
  description?: string | null;
  category: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  cost: number;
  supplier?: string | null;
  status: RawMaterialStatus;
}

function normalizeRawMaterial(data: RawMaterialInput) {
  return {
    code: data.code.trim(),
    name: data.name.trim(),
    description: data.description?.trim() || null,
    category: data.category.trim(),
    unit: data.unit.trim(),
    currentStock: Number(data.currentStock),
    minimumStock: Number(data.minimumStock),
    cost: Number(data.cost),
    supplier: data.supplier?.trim() || null,
    status: data.status,
  };
}

export async function getRawMaterials() {
  return prisma.rawMaterial.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRawMaterial(id: string) {
  return prisma.rawMaterial.findUnique({
    where: {
      id,
    },
  });
}

export async function createRawMaterial(
  data: RawMaterialInput
) {
  return prisma.rawMaterial.create({
    data: normalizeRawMaterial(data),
  });
}

export async function updateRawMaterial(
  id: string,
  data: RawMaterialInput
) {
  return prisma.rawMaterial.update({
    where: {
      id,
    },
    data: normalizeRawMaterial(data),
  });
}

export async function deleteRawMaterial(id: string) {
  return prisma.rawMaterial.delete({
    where: {
      id,
    },
  });
}
