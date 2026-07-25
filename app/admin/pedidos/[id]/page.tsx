import Link from "next/link";

import { prisma } from "@/lib/prisma";

import OrderToolbar from "@/components/admin/orders/details/OrderToolbar";
import OrderHeader from "@/components/admin/orders/details/OrderHeader";
import CustomerCard from "@/components/admin/orders/details/CustomerCard";
import ProductsTable from "@/components/admin/orders/details/ProductsTable";
import StatusCard from "@/components/admin/orders/details/StatusCard";
import FooterInfo from "@/components/admin/orders/details/FooterInfo";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
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

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-10 text-center">

          <h1 className="mb-4 text-3xl font-bold">
            Pedido no encontrado
          </h1>

          <Link
            href="/admin/pedidos"
            className="rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white"
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

        <OrderToolbar
          orderId={order.id}
        />

        <OrderHeader
          createdAt={order.createdAt.toISOString()}
          status={order.status}
        />

        <CustomerCard
          customerName={order.customerName}
          company={order.company}
          email={order.email}
          phone={order.phone}
          country={order.country}
          city={order.city}
          customerType={order.customerType}
        />

        <ProductsTable
          items={order.items}
        />

        <StatusCard
          status={order.status}
        />

        <FooterInfo />

      </div>

    </main>
  );
}