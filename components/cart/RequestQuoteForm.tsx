"use client";

import { useState } from "react";

export default function RequestQuoteForm() {
  const [form, setForm] = useState({
    customerName: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    customerType: "PARTICULAR",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Solicitar Cotización
      </h2>

      <p className="mt-2 mb-8 text-neutral-400">
        Completa tus datos y nuestro equipo se pondrá en contacto contigo.
      </p>

      <div className="grid gap-5 md:grid-cols-2">

        <input
          name="customerName"
          placeholder="Nombre completo"
          value={form.customerName}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <input
          name="company"
          placeholder="Empresa (opcional)"
          value={form.company}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <input
          name="phone"
          placeholder="WhatsApp"
          value={form.phone}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <input
          name="country"
          placeholder="País"
          value={form.country}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <input
          name="city"
          placeholder="Ciudad"
          value={form.city}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-white"
        />

        <select
          name="customerType"
          value={form.customerType}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-white md:col-span-2"
        >
          <option value="PARTICULAR">Cliente Particular</option>
          <option value="DISTRIBUIDOR">Distribuidor</option>
          <option value="MAYORISTA">Mayorista</option>
        </select>

        <textarea
          name="notes"
          rows={5}
          placeholder="Comentarios"
          value={form.notes}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-white md:col-span-2"
        />

      </div>

    </div>
  );
}