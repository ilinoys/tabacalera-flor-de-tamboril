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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/85 px-4 py-6 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl border border-yellow-500/20 bg-neutral-900 p-6 text-center shadow-2xl sm:p-10">
        <Image
          src="/images/logo/logo.png"
          alt="Flor de Tamboril"
          width={130}
          height={130}
          className="mx-auto mb-6 h-24 w-24 sm:h-[130px] sm:w-[130px]"
          priority
        />

        <span className="inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Acceso restringido
        </span>

        <h1 className="mt-6 text-4xl font-bold text-white">
          +18
        </h1>

        <p className="mt-6 text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
          Nuestros puros artesanales estan destinados unicamente para
          personas mayores de edad.
        </p>

        <p className="mt-4 text-neutral-500">
          Debes confirmar que tienes 18 anos o mas para continuar navegando.
        </p>

        <div className="mt-8 space-y-4 sm:mt-10">
          <button
            type="button"
            onClick={accept}
            className="min-h-12 w-full rounded-xl bg-yellow-500 py-4 text-base font-semibold text-black transition hover:bg-yellow-400 sm:text-lg"
          >
            Soy mayor de 18 anos
          </button>

          <button
            type="button"
            onClick={decline}
            className="min-h-12 w-full rounded-xl border border-neutral-700 py-4 text-base font-semibold text-white transition hover:border-red-500 hover:text-red-400 sm:text-lg"
          >
            Salir del sitio
          </button>
        </div>

        <p className="mt-8 text-xs text-neutral-500">
          Al continuar confirmas que cumples con la edad minima requerida
          para visualizar este sitio web.
        </p>
      </div>
    </div>
  );
}
