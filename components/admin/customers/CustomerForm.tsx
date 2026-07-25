"use client";

import { useState } from "react";

interface Customer {
  id?: string;
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  customerType: string;
}

interface Props {
  customer?: Customer | null;
  onSuccess: () => void;
}

const emptyCustomer: Customer = {
  customerName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  customerType: "PARTICULAR",
};

function getInitialCustomer(customer?: Customer | null): Customer {
  if (!customer) return emptyCustomer;

  return {
    id: customer.id,
    customerName: customer.customerName,
    company: customer.company ?? "",
    email: customer.email,
    phone: customer.phone,
    country: customer.country,
    city: customer.city,
    customerType: customer.customerType,
  };
}

export default function CustomerForm({
  customer,
  onSuccess,
}: Props) {
  const editing = !!customer;

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Customer>(() =>
    getInitialCustomer(customer)
  );

  function update(field: keyof Customer, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveCustomer() {
    try {
      setSaving(true);

      // ✅ Solo enviamos los campos permitidos
      const payload = {
        customerName: form.customerName,
        company: form.company,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
        customerType: form.customerType,
      };

      const response = await fetch(
        editing
          ? `/api/clientes/${customer?.id}`
          : "/api/clientes",
        {
          method: editing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ?? "No se pudo guardar el cliente."
        );
      }

      alert(
        editing
          ? "Cliente actualizado correctamente."
          : "Cliente creado correctamente."
      );

      onSuccess();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrió un error."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <input
        value={form.customerName}
        onChange={(e) =>
          update("customerName", e.target.value)
        }
        placeholder="Nombre"
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
      />

      <input
        value={form.company ?? ""}
        onChange={(e) =>
          update("company", e.target.value)
        }
        placeholder="Empresa"
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
      />

      <input
        value={form.email}
        onChange={(e) =>
          update("email", e.target.value)
        }
        placeholder="Correo"
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
      />

      <input
        value={form.phone}
        onChange={(e) =>
          update("phone", e.target.value)
        }
        placeholder="Teléfono"
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
      />

      <input
        value={form.country}
        onChange={(e) =>
          update("country", e.target.value)
        }
        placeholder="País"
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
      />

      <input
        value={form.city}
        onChange={(e) =>
          update("city", e.target.value)
        }
        placeholder="Ciudad"
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
      />

      <select
        value={form.customerType}
        onChange={(e) =>
          update("customerType", e.target.value)
        }
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
      >
        <option value="PARTICULAR">Particular</option>
        <option value="DISTRIBUIDOR">Distribuidor</option>
        <option value="MAYORISTA">Mayorista</option>
      </select>

      <button
        onClick={saveCustomer}
        disabled={saving}
        className="w-full rounded-xl bg-yellow-600 py-4 font-bold text-white hover:bg-yellow-500 disabled:opacity-50"
      >
        {saving
          ? "Guardando..."
          : editing
          ? "Actualizar Cliente"
          : "Guardar Cliente"}
      </button>
    </div>
  );
}
