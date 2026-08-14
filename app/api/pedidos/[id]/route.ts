import { NextRequest, NextResponse } from "next/server";
import {
  getOrder,
  updateOrderStatus,
  deleteOrder,
} from "@/services/orderService";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await getOrder(id);

    if (!order) {
      return NextResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener pedido" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { status } = await req.json();

    const order = await updateOrderStatus(id, status);

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al actualizar estado" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteOrder(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);

    // Handle Prisma 'record not found' error (P2025)
    const maybePrismaError = error as { code?: string };

    if (maybePrismaError.code === "P2025") {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ error: "Error al eliminar pedido" }, { status: 500 });
  }
}