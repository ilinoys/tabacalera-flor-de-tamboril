"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function ClientesPage() {
  return (
    <main className="flex min-h-screen bg-black">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <div className="p-10">

          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-4xl font-bold text-white">
                Clientes
              </h1>

              <p className="mt-3 max-w-3xl text-neutral-400">
                Administra todos los clientes de Flor de Tamboril.
                Desde este módulo podrás consultar información,
                cotizaciones, pedidos e historial comercial.
              </p>

            </div>

            <button
              className="rounded-xl bg-yellow-600 px-8 py-4 font-bold text-white transition hover:bg-yellow-500"
            >
              + Nuevo Cliente
            </button>

          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

              <p className="text-sm text-neutral-400">
                Total Clientes
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                0
              </h2>

            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

              <p className="text-sm text-neutral-400">
                Distribuidores
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                0
              </h2>

            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

              <p className="text-sm text-neutral-400">
                Mayoristas
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                0
              </h2>

            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

              <p className="text-sm text-neutral-400">
                Particulares
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                0
              </h2>

            </div>

          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">

            <table className="w-full">

              <thead className="bg-black">

                <tr>

                  <th className="p-5 text-left text-yellow-500">
                    Cliente
                  </th>

                  <th className="p-5 text-left text-yellow-500">
                    Empresa
                  </th>

                  <th className="p-5 text-left text-yellow-500">
                    País
                  </th>

                  <th className="p-5 text-left text-yellow-500">
                    Tipo
                  </th>

                  <th className="p-5 text-center text-yellow-500">
                    Acciones
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td
                    colSpan={5}
                    className="p-10 text-center text-neutral-500"
                  >
                    Todavía no hay clientes registrados.
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  );
}