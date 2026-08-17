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

    // Abrir una pestaña vacía de forma inmediata en la acción del usuario
    // para evitar que el navegador bloquee el popup cuando hagamos la
    // navegación a wa.me después de crear el pedido.
    const win = typeof window !== "undefined" ? window.open("", "_blank", "noopener,noreferrer") : null;

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

      // Pedido creado correctamente
      // Intentar obtener el número de WhatsApp desde /api/configuracion
      let waNumber: string | null = null;

      try {
        const cfgRes = await fetch("/api/configuracion");
        if (cfgRes.ok) {
          const cfg = await cfgRes.json();
          if (cfg && cfg.whatsapp) {
            waNumber = String(cfg.whatsapp);
          }
        }
      } catch (cfgErr) {
        // No consideramos esto un fallo crítico: el pedido ya está creado.
        console.error("No se pudo obtener configuración:", cfgErr);
      }

      // Construir el mensaje exactamente con los datos enviados
      const total = items.reduce((sum, it) => sum + Number(it.price) * Number(it.quantity), 0);

      const lines: string[] = [];
      lines.push("🔔 NUEVO PEDIDO");
      lines.push(`Cliente: ${form.customerName}`);
      lines.push(`Empresa: ${form.company || ""}`);
      lines.push(`Correo: ${form.email}`);
      lines.push(`Teléfono: ${form.phone}`);
      lines.push(`País: ${form.country}`);
      lines.push(`Ciudad: ${form.city}`);
      lines.push(`Tipo de cliente: ${form.customerType}`);
      lines.push(`Fecha: ${new Date().toLocaleString()}`);
      lines.push("");
      lines.push("Productos:");

      for (const it of items) {
        // Asumir que item tiene name, quantity y price
        const itemTyped = it as { name?: string; productName?: string; id?: string; quantity?: number; price?: number };
        const name = itemTyped.name || itemTyped.productName || itemTyped.id || "";
        const qty = Number(it.quantity);
        const price = Number(it.price);
        lines.push(`• ${name} × ${qty} — RD$ ${price.toFixed(2)}`);
      }

      lines.push("");
      lines.push(`Total: RD$ ${total.toFixed(2)}`);
      lines.push("");
      lines.push("Comentarios:");
      lines.push(form.notes || "");
      lines.push("");
      lines.push("Estado: PENDIENTE");

      const message = lines.join("\n");
      const encoded = encodeURIComponent(message);

      // Preparar la URL de wa.me; limpiar el número dejando solo dígitos
      let waUrl: string;

      if (waNumber) {
        const digits = waNumber.replace(/\D/g, "");
        if (digits.length > 0) {
          waUrl = `https://wa.me/${digits}?text=${encoded}`;
        } else {
          waUrl = `https://wa.me/?text=${encoded}`;
        }
      } else {
        waUrl = `https://wa.me/?text=${encoded}`;
      }

      // Navegar la ventana ya abierta a wa.me para evitar bloqueador
      if (win) {
        try {
          win.location.href = waUrl;
        } catch (navErr) {
          // Si por alguna razón no se puede asignar location, abrir nueva ventana como fallback
          console.error("No se pudo navegar la ventana abierta:", navErr);
          window.open(waUrl, "_blank", "noopener,noreferrer");
        }
      } else {
        // Si la ventana no fue creada (bloqueada), intentar abrir directamente
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }

      alert("✅ Solicitud enviada correctamente.");

      // Mantener comportamiento actual: limpiar carrito y formulario
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
      // Si hubo un error al crear el pedido, cerrar la ventana abierta y mostrar error
      try {
        win?.close();
      } catch {
        // ignore
      }

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
