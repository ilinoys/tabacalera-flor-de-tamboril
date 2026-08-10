"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RequestQuoteForm from "@/components/cart/RequestQuoteForm";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const totalPrice = useCartStore(
    (state) => state.totalPrice
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-12 text-4xl font-bold text-yellow-500 md:text-5xl">
            Carrito de Compras
          </h1>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-12 text-center">

              <h2 className="text-3xl font-bold">
                Tu carrito está vacío
              </h2>

              <p className="mt-4 text-neutral-400">
                Agrega algunos puros para comenzar.
              </p>

              <Link
                href="/tienda"
                className="mt-8 inline-block rounded-lg bg-yellow-600 px-8 py-4 font-bold hover:bg-yellow-500"
              >
                Ir a la Tienda
              </Link>

            </div>
          ) : (
            <>
              <div className="grid gap-10 lg:grid-cols-3">

                <div className="space-y-6 lg:col-span-2">

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-5 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 sm:flex-row sm:gap-6 sm:p-6"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={140}
                        height={140}
                        className="h-36 w-full rounded-xl bg-black object-contain sm:h-[140px] sm:w-[140px]"
                      />

                      <div className="flex flex-1 flex-col justify-between">

                        <div>
                          <h2 className="text-2xl font-bold">
                            {item.name}
                          </h2>

                          <p className="mt-2 text-neutral-400">
                            {item.description}
                          </p>

                          <p className="mt-3 text-xl font-bold text-yellow-500">
                            US$ {item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center gap-3">

                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-neutral-800 p-2 hover:bg-neutral-700"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="text-xl font-bold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-neutral-800 p-2 hover:bg-neutral-700"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto flex min-h-11 min-w-11 items-center justify-center text-red-500 hover:text-red-400 sm:ml-6"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 />
                          </button>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>

                <div className="h-fit rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

                  <h2 className="text-3xl font-bold">
                    Resumen
                  </h2>

                  <div className="mt-8 flex justify-between text-xl">
                    <span>Total</span>

                    <span className="font-bold text-yellow-500">
                      US$ {totalPrice().toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href="#solicitud"
                    className="mt-10 block w-full rounded-lg bg-yellow-600 py-4 text-center text-lg font-bold hover:bg-yellow-500"
                  >
                    Solicitar Cotización
                  </Link>

                </div>

              </div>

              <div id="solicitud" className="mt-12">
                <RequestQuoteForm />
              </div>
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
