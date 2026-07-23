import { NextRequest, NextResponse } from "next/server";
import { RawMaterialStatus } from "@prisma/client";

import {
  createRawMaterial,
  getRawMaterials,
} from "@/services/rawMaterialService";

function getStatus(status: unknown) {
  return status === RawMaterialStatus.INACTIVE
    ? RawMaterialStatus.INACTIVE
    : RawMaterialStatus.ACTIVE;
}

export async function GET() {
  try {
    const rawMaterials = await getRawMaterials();

    return NextResponse.json(rawMaterials);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener materias primas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const rawMaterial = await createRawMaterial({
      code: data.code,
      name: data.name,
      description: data.description,
      category: data.category,
      unit: data.unit,
      currentStock: Number(data.currentStock),
      minimumStock: Number(data.minimumStock),
      cost: Number(data.cost),
      supplier: data.supplier,
      status: getStatus(data.status),
    });

    return NextResponse.json(rawMaterial, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al crear materia prima" },
      { status: 500 }
    );
  }
}
