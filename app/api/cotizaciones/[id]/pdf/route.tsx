import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";

import { prisma } from "@/lib/prisma";
import QuotationPDF from "@/components/pdf/QuotationPDF";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const quotation = await prisma.quotation.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

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

    const stream = await renderToStream(
      <QuotationPDF
        quotationNumber={quotation.quotationNumber}
        createdAt={quotation.createdAt.toISOString()}
        status={quotation.status}
        customer={quotation.customer}
        items={quotation.items}
        subtotal={quotation.subtotal}
        discount={quotation.discount}
        total={quotation.total}
      />
    );

    return new Response(stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${quotation.quotationNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo generar el PDF.",
      },
      {
        status: 500,
      }
    );
  }
}