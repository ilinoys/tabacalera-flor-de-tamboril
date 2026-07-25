import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/services/orderService";

export async function GET() {
  try {
    const orders = await getOrders();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/pedidos:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("===== NUEVO PEDIDO =====");
    console.log(JSON.stringify(data, null, 2));

    const order = await createOrder(data);

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/pedidos:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}