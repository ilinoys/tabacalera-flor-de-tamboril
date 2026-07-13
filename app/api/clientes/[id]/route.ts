import { NextResponse } from "next/server";

import { getCustomer } from "@/services/customerService";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const customer = await getCustomer(id);

    if (!customer) {
      return NextResponse.json(
        {
          error: "Cliente no encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo obtener el cliente.",
      },
      {
        status: 500,
      }
    );
  }
}