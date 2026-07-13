import { NextResponse } from "next/server";

import {
  deleteQuotation,
  getQuotation,
  updateQuotationStatus,
} from "@/services/quotationService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const quotation = await getQuotation(id);

    if (!quotation) {
      return NextResponse.json(
        {
          error: "Cotización no encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(quotation);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al obtener la cotización.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const quotation = await updateQuotationStatus(
      id,
      body.status
    );

    return NextResponse.json(quotation);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo actualizar la cotización.",
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteQuotation(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo eliminar la cotización.",
      },
      {
        status: 400,
      }
    );
  }
}