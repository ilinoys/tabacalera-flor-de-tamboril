import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import { join } from "path";
import { createElement } from "react";
import type { ReactElement } from "react";

import { prisma } from "@/lib/prisma";
import { DEFAULT_EXCHANGE_RATE } from "@/lib/exchange";
import QuotationPDF from "@/components/pdf/QuotationPDF";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function resolveLogoPath(logo?: string | null) {
  if (!logo) {
    return join(
      process.cwd(),
      "public",
      "images",
      "logo",
      "logo.png"
    );
  }

  if (logo.startsWith("/")) {
    return join(
      process.cwd(),
      "public",
      logo.slice(1)
    );
  }

  return logo;
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

    const companySettings =
      await prisma.companySettings.findFirst();

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

    const pdfDocument = createElement(QuotationPDF, {
        quotationNumber: quotation.quotationNumber,
        createdAt: quotation.createdAt.toISOString(),
        validUntil: quotation.validUntil?.toISOString(),
        status: quotation.status,
        currency: quotation.currency,
        exchangeRate:
          companySettings?.exchangeRate ??
          DEFAULT_EXCHANGE_RATE,
        paymentTerms: quotation.paymentTerms,
        deliveryTime: quotation.deliveryTime,
        incoterm: quotation.incoterm,
        salesperson: quotation.salesperson,
        notes: quotation.notes,
        company: {
          name:
            companySettings?.companyName ??
            "FLOR DE TAMBORIL",
          slogan:
            companySettings?.slogan ??
            "Dominican Premium Cigars",
          logoSrc: resolveLogoPath(companySettings?.logo),
          showLogo: companySettings?.showLogo ?? true,
          rnc: companySettings?.rnc,
          address:
            companySettings?.address ??
            "Tamboril, Santiago",
          city: companySettings?.city ?? "Santiago",
          country:
            companySettings?.country ??
            "Republica Dominicana",
          phone: companySettings?.phone,
          mobile: companySettings?.mobile,
          email: companySettings?.email,
          website:
            companySettings?.website ??
            "www.flordetamboril.com",
          pdfFooter: companySettings?.pdfFooter,
          showSignature:
            companySettings?.showSignature ?? true,
        },
        customer: quotation.customer,
        items: quotation.items,
        subtotal: quotation.subtotal,
        discount: quotation.discount,
        total: quotation.total,
      }) as ReactElement<DocumentProps>;

    const stream = await renderToStream(pdfDocument);

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
