"use client";

import { useState } from "react";

import QuoteProducts from "./QuoteProducts";
import QuoteTotals from "./QuoteTotals";
import { useQuote } from "./useQuote";

export default function QuoteForm() {
  const [customerName, setCustomerName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const {
    items,
    subtotal,
    addProduct,
  } = useQuote();

  return (
    <div className="space-y-8">

      {/* Datos del cliente */}

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

        <h2 className="mb-6 text-2xl font-bold text-yellow-500">
          Información del Cliente
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-white">
              Nombre
            </label>

            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-white">
              Empresa
            </label>

            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-white">
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-white">
              WhatsApp
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
            />

          </div>

        </div>

      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="space-y-8 xl:col-span-2">

          <QuoteProducts
            items={items}
            onAdd={addProduct}
          />

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

            <h2 className="mb-6 text-2xl font-bold text-yellow-500">
              Productos Seleccionados
            </h2>

            {items.length === 0 ? (

              <p className="text-neutral-400">
                Aún no has agregado productos.
              </p>

            ) : (

              <div className="space-y-4">

                {items.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-neutral-800 bg-black p-4"
                  >

                    <div>

                      <p className="font-bold text-white">
                        {item.name}
                      </p>

                      <p className="text-neutral-400">
                        Cantidad: {item.quantity}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-bold text-yellow-500">
                        US$ {(item.price * item.quantity).toFixed(2)}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

        <div>

          <QuoteTotals subtotal={subtotal} />

        </div>

      </div>

    </div>
  );
}