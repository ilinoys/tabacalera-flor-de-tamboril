"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  customerName: string;
  company?: string;
  email: string;
  country: string;
  customerType: string;
}

interface Props {
  value: string;
  onChange: (customerId: string) => void;
}

export default function CustomerSelector({
  value,
  onChange,
}: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCustomers() {
    try {
      const response = await fetch("/api/clientes");

      if (!response.ok) {
        throw new Error("No se pudieron cargar los clientes.");
      }

      const data = await response.json();

      setCustomers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div className="space-y-2">

      <label className="text-sm font-semibold text-white">
        Cliente
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
      >
        <option value="">
          {loading
            ? "Cargando clientes..."
            : "Seleccione un cliente"}
        </option>

        {customers.map((customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.customerName}
            {customer.company
              ? ` - ${customer.company}`
              : ""}
          </option>
        ))}

      </select>

      {!loading && customers.length === 0 && (
        <p className="text-sm text-red-400">
          No hay clientes registrados.
        </p>
      )}

    </div>
  );
}