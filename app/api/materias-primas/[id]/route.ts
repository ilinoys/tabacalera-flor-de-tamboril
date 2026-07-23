import { NextRequest, NextResponse } from "next/server";
import { RawMaterialStatus } from "@prisma/client";

import {
  deleteRawMaterial,
  getRawMaterial,
  updateRawMaterial,
} from "@/services/rawMaterialService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function getStatus(status: unknown) {
  return status === RawMaterialStatus.INACTIVE
    ? RawMaterialStatus.INACTIVE
    : RawMaterialStatus.ACTIVE;
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;
    const rawMaterial = await getRawMaterial(id);

    if (!rawMaterial) {
      return NextResponse.json(
        { error: "Materia prima no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(rawMaterial);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener materia prima" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const rawMaterial = await updateRawMaterial(id, {
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

    return NextResponse.json(rawMaterial);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al actualizar materia prima" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    await deleteRawMaterial(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al eliminar materia prima" },
      { status: 500 }
    );
  }
}
