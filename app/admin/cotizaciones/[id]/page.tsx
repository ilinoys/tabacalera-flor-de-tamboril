import Link from "next/link";

import { prisma } from "@/lib/prisma";

import QuotationToolbar from "@/components/admin/quotations/details/QuotationToolbar";
import QuotationHeader from "@/components/admin/quotations/details/QuotationHeader";
import CustomerCard from "@/components/admin/quotations/details/CustomerCard";
import ProductsTable from "@/components/admin/quotations/details/ProductsTable";
import TotalsCard from "@/components/admin/quotations/details/TotalsCard";
import FooterInfo from "@/components/admin/quotations/details/FooterInfo";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuotationDetailsPage({
  params,
}: Props) {
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-10 text-center">

          <h1 className="mb-4 text-3xl font-bold">
            Cotización no encontrada
          </h1>

          <Link
            href="/admin/cotizaciones"
            className="mt-4 inline-block rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500"
          >
            Volver
          </Link>

        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-8">

      <div className="mx-auto max-w-7xl">

        <QuotationToolbar
          quotationId={quotation.id}
        />

        <QuotationHeader
          quotationNumber={quotation.quotationNumber}
          createdAt={quotation.createdAt.toISOString()}
          status={quotation.status}
        />

        <CustomerCard
          customerName={quotation.customer.customerName}
          company={quotation.customer.company}
          email={quotation.customer.email}
          phone={quotation.customer.phone}
          country={quotation.customer.country}
          city={quotation.customer.city}
        />

        <ProductsTable
          items={quotation.items}
        />

        <TotalsCard
          subtotal={quotation.subtotal}
          discount={quotation.discount}
          total={quotation.total}
        />

        <FooterInfo />

      </div>

    </main>
  );
}