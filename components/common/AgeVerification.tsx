"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "flor-age-verified";

export default function AgeVerification() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY);

    if (!verified) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  function decline() {
    window.location.href = "https://www.google.com";
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md px-6">
      <div className="w-full max-w-lg rounded-3xl border border-yellow-500/20 bg-neutral-900 p-10 text-center shadow-2xl">

        <Image
          src="/images/logo/logo.png"
          alt="Flor de Tamboril"
          width={130}
          height={130}
          className="mx-auto mb-6"
          priority
        />

        <span className="inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Acceso restringido
        </span>

        <h1 className="mt-6 text-4xl font-bold text-white">
          +18
        </h1>

        <p className="mt-6 text-lg text-neutral-300 leading-8">
          Nuestros puros artesanales están destinados únicamente
          para personas mayores de edad.
        </p>

        <p className="mt-4 text-neutral-500">
          Debes confirmar que tienes 18 años o más para
          continuar navegando.
        </p>

        <div className="mt-10 space-y-4">

          <button
            onClick={accept}
            className="w-full rounded-xl bg-yellow-500 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
          >
            Soy mayor de 18 años
          </button>

          <button
            onClick={decline}
            className="w-full rounded-xl border border-neutral-700 py-4 text-lg font-semibold text-white transition hover:border-red-500 hover:text-red-400"
          >
            Salir del sitio
          </button>

        </div>

        <p className="mt-8 text-xs text-neutral-500">
          Al continuar confirmas que cumples con la edad mínima
          requerida para visualizar este sitio web.
        </p>

      </div>
    </div>
  );
}