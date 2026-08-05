"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function RequestQuoteForm() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (items.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      alert("✅ Solicitud enviada correctamente.");

      clearCart();

      setForm({
        customerName: "",
        company: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        customerType: "PARTICULAR",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo enviar la solicitud.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-8"
    >
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
          className="rounded-xl border border-neutral-700 bg-black p-4 text-base text-white"
          required
        />

        <input
          name="company"
          placeholder="Empresa (opcional)"
          value={form.company}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-base text-white"
        />

        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-base text-white"
          required
        />

        <input
          name="phone"
          placeholder="WhatsApp"
          value={form.phone}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-base text-white"
          required
        />

        <input
          name="country"
          placeholder="País"
          value={form.country}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-base text-white"
          required
        />

        <input
          name="city"
          placeholder="Ciudad"
          value={form.city}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-base text-white"
          required
        />

        <select
          name="customerType"
          value={form.customerType}
          onChange={handleChange}
          className="rounded-xl border border-neutral-700 bg-black p-4 text-base text-white md:col-span-2"
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
          className="rounded-xl border border-neutral-700 bg-black p-4 text-base text-white md:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="min-h-12 rounded-xl bg-yellow-600 p-4 font-bold text-white hover:bg-yellow-500 disabled:opacity-50 md:col-span-2"
        >
          {loading ? "Enviando..." : "Enviar Solicitud"}
        </button>
      </div>
    </form>
  );
}
