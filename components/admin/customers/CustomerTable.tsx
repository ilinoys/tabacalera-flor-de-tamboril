"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CustomerActions from "./CustomerActions";
import CustomerSearch from "./CustomerSearch";
import CustomerStats from "./CustomerStats";
import CustomerRow from "./CustomerRow";

export interface Customer {
  id: string;
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  customerType: string;
}

interface Props {
  reloadKey: number;
  onEdit: (customer: Customer) => void;
}

export default function CustomerTable({
  reloadKey,
  onEdit,
}: Props) {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCustomers() {
      try {
        const url = search
          ? `/api/clientes?search=${encodeURIComponent(search)}`
          : "/api/clientes";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        if (!cancelled) {
          setCustomers(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    void loadCustomers();

    return () => {
      cancelled = true;
    };
  }, [reloadKey, search]);

  async function removeCustomer(id: string) {
    setCustomers((current) =>
      current.filter((customer) => customer.id !== id)
    );
  }

  const stats = useMemo(() => {
    return {
      total: customers.length,

      particulares: customers.filter(
        (c) => c.customerType === "PARTICULAR"
      ).length,

      distribuidores: customers.filter(
        (c) => c.customerType === "DISTRIBUIDOR"
      ).length,

      mayoristas: customers.filter(
        (c) => c.customerType === "MAYORISTA"
      ).length,
    };
  }, [customers]);

  return (
    <>
      <CustomerSearch
        value={search}
        onChange={setSearch}
      />

      <CustomerStats
        total={stats.total}
        particulares={stats.particulares}
        distribuidores={stats.distribuidores}
        mayoristas={stats.mayoristas}
      />

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900">
        <div className="space-y-3 p-3 md:hidden">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="rounded-xl border border-neutral-800 bg-black p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-white">{customer.customerName}</p>
                  <p className="mt-1 text-xs text-neutral-400">{customer.email}</p>
                </div>

                <span className="inline-flex rounded-full bg-yellow-600 px-2 py-1 text-[10px] font-bold text-white">
                  {customer.customerType}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-neutral-500">Empresa</p>
                  <p className="text-white">{customer.company || "-"}</p>
                </div>
                <div>
                  <p className="text-neutral-500">País</p>
                  <p className="text-white">{customer.country}</p>
                </div>
              </div>

              <div className="mt-4">
                <CustomerActions
                  onView={() => router.push(`/admin/clientes/${customer.id}`)}
                  onEdit={() => onEdit(customer)}
                  onDelete={async () => {
                    const confirmDelete = confirm(
                      `¿Eliminar el cliente "${customer.customerName}"?`
                    );

                    if (!confirmDelete) return;

                    try {
                      const response = await fetch(`/api/clientes/${customer.id}`, {
                        method: "DELETE",
                      });

                      const result = await response.json();

                      if (!response.ok) {
                        throw new Error(result.error ?? "No se pudo eliminar el cliente.");
                      }

                      removeCustomer(customer.id);
                      alert("Cliente eliminado correctamente.");
                    } catch (error) {
                      console.error(error);
                      alert(error instanceof Error ? error.message : "Ocurrió un error.");
                    }
                  }}
                />
              </div>
            </div>
          ))}

          {customers.length === 0 && (
            <div className="p-6 text-center text-sm text-neutral-400">
              No hay clientes registrados.
            </div>
          )}
        </div>

        <div className="hidden overflow-hidden md:block">
          <table className="w-full">
            <thead className="bg-black">
              <tr>
                <th className="p-5 text-left text-yellow-500">Cliente</th>
                <th className="p-5 text-left text-yellow-500">Empresa</th>
                <th className="p-5 text-left text-yellow-500">País</th>
                <th className="p-5 text-left text-yellow-500">Tipo</th>
                <th className="p-5 text-center text-yellow-500">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onEdit={onEdit}
                  onDeleted={removeCustomer}
                />
              ))}

              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-neutral-500">
                    No hay clientes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
