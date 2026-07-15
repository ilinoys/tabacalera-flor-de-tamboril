import Link from "next/link";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },

      quotations: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-10 text-center">

          <h1 className="text-3xl font-bold text-white">
            Cliente no encontrado
          </h1>

          <Link
            href="/admin/clientes"
            className="mt-6 inline-block rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500"
          >
            Volver
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-10">

      <div className="mx-auto max-w-7xl">

        <Link
          href="/admin/clientes"
          className="mb-8 inline-block rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500"
        >
          ← Volver
        </Link>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

          <h1 className="text-4xl font-bold text-white">
            {customer.customerName}
          </h1>

          <p className="mt-2 text-neutral-400">
            {customer.company || "Cliente Particular"}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border border-neutral-800 bg-black p-6">

              <h2 className="mb-4 text-xl font-bold text-yellow-500">
                Información
              </h2>

              <p className="text-white">
                <strong>Email:</strong> {customer.email}
              </p>

              <p className="mt-2 text-white">
                <strong>Teléfono:</strong> {customer.phone}
              </p>

              <p className="mt-2 text-white">
                <strong>País:</strong> {customer.country}
              </p>

              <p className="mt-2 text-white">
                <strong>Ciudad:</strong> {customer.city}
              </p>

              <p className="mt-2 text-white">
                <strong>Tipo:</strong> {customer.customerType}
              </p>

            </div>

            <div className="rounded-xl border border-neutral-800 bg-black p-6">

              <h2 className="mb-4 text-xl font-bold text-yellow-500">
                Estadísticas
              </h2>

              <p className="text-white">
                Pedidos:
                <strong> {customer.orders.length}</strong>
              </p>

              <p className="mt-2 text-white">
                Cotizaciones:
                <strong> {customer.quotations.length}</strong>
              </p>

            </div>

          </div>

          <div className="mt-8 rounded-xl border border-neutral-800 bg-black p-6">

            <h2 className="mb-5 text-2xl font-bold text-yellow-500">
              Últimos Pedidos
            </h2>

            {customer.orders.length === 0 ? (
              <p className="text-neutral-400">
                Este cliente aún no tiene pedidos.
              </p>
            ) : (
              <div className="space-y-3">

                {customer.orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border border-neutral-800 p-4"
                  >
                    <div className="flex justify-between">

                      <span className="font-semibold text-white">
                        {order.status}
                      </span>

                      <span className="text-neutral-400">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

          <div className="mt-8 rounded-xl border border-neutral-800 bg-black p-6">

            <h2 className="mb-5 text-2xl font-bold text-yellow-500">
              Últimas Cotizaciones
            </h2>

            {customer.quotations.length === 0 ? (
              <p className="text-neutral-400">
                Este cliente aún no tiene cotizaciones.
              </p>
            ) : (
              <div className="space-y-3">

                {customer.quotations.map((quotation) => (
                  <div
                    key={quotation.id}
                    className="rounded-lg border border-neutral-800 p-4"
                  >
                    <div className="flex justify-between">

                      <span className="font-semibold text-white">
                        {quotation.quotationNumber}
                      </span>

                      <span className="text-neutral-400">
                        {quotation.status}
                      </span>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}