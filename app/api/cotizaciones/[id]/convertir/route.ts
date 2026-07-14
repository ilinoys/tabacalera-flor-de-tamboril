import { NextResponse } from "next/server";

import { createOrderFromQuotation } from "@/services/orderService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const order = await createOrderFromQuotation(id);

    return NextResponse.json(order, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo convertir la cotización.",
      },
      {
        status: 400,
      }
    );
  }
}