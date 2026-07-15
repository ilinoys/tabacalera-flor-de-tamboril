"use client";

import { useEffect, useMemo, useState } from "react";

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

                <td
                  colSpan={5}
                  className="p-10 text-center text-neutral-500"
                >
                  No hay clientes registrados.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </>
  );
}
