import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/currency";
import { sendQuotationEmail } from "@/services/emailService";

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
    const origin = new URL(request.url).origin;

    const quotation = await prisma.quotation.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
      },
    });

    if (!quotation) {
      return NextResponse.json(
        {
          error: "Cotizacion no encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    const companySettings =
      await prisma.companySettings.findFirst();

    const pdfUrl = new URL(
      `/api/cotizaciones/${quotation.id}/pdf`,
      origin
    ).toString();

    const subject =
      `Cotizacion ${quotation.quotationNumber} - ` +
      `${companySettings?.companyName ?? "Flor de Tamboril"}`;

    const body = [
      `Hola ${quotation.customer.customerName},`,
      "",
      "Te compartimos la cotizacion solicitada.",
      "",
      `Numero de cotizacion: ${quotation.quotationNumber}`,
      `Total: ${formatCurrency(
        quotation.total,
        quotation.currency
      )}`,
      `PDF: ${pdfUrl}`,
      "",
      "Quedamos atentos a tus comentarios.",
      "",
      companySettings?.senderName ??
        companySettings?.companyName ??
        "Flor de Tamboril",
    ].join("\n");

    const result = await sendQuotationEmail({
      to: quotation.customer.email,
      subject,
      body,
      pdfUrl,
      fromName:
        companySettings?.senderName ??
        companySettings?.companyName,
      fromEmail:
        companySettings?.senderEmail ??
        companySettings?.email,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo preparar el correo.",
      },
      {
        status: 500,
      }
    );
  }
}
