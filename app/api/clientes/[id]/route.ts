import { NextRequest, NextResponse } from "next/server";

import {
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/services/customerService";

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

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const data = await request.json();

    const customer = await updateCustomer(id, data);

    return NextResponse.json(customer);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo actualizar el cliente.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await deleteCustomer(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo eliminar el cliente.",
      },
      {
        status: 500,
      }
    );
  }
}