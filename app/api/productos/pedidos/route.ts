import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/services/orderService";

export async function GET() {
  try {
    const orders = await getOrders();

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener pedidos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const order = await createOrder(data);

    return NextResponse.json(order, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al crear pedido" },
      { status: 500 }
    );
  }
}