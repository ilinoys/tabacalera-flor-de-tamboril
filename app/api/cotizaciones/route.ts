import { NextResponse } from "next/server";

import {
  createQuotation,
  getQuotations,
} from "@/services/quotationService";

export async function GET() {
  try {
    const quotations = await getQuotations();

    return NextResponse.json(quotations);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudieron obtener las cotizaciones.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const quotation = await createQuotation(body);

    return NextResponse.json(quotation, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo crear la cotización.",
      },
      {
        status: 400,
      }
    );
  }
}