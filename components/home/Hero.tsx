"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-4xl px-6 text-center">

          {/* País */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-yellow-500 uppercase tracking-[8px] text-sm md:text-base"
          >
            República Dominicana
          </motion.h2>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 mb-6 flex justify-center"
          >
            <Image
              src="/images/logo/logo.png"
              alt="Logo Tabacalera Flor De Tamboril"
              width={140}
              height={140}
              priority
            />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white"
          >
            Tabacalera
            <br />
            <span className="text-yellow-500">
              Flor De Tamboril
            </span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-neutral-300 leading-8 max-w-3xl mx-auto"
          >
            Elaboramos puros dominicanos de la más alta calidad,
            combinando tradición artesanal con una cuidadosa selección
            de hojas de tabaco premium.
          </motion.p>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col md:flex-row justify-center gap-6"
          >
            <Link
  href="/tienda"
  className="rounded-lg bg-yellow-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-yellow-500 hover:scale-105"
>
  Comprar Ahora
</Link>

            <Link
              href="/tienda"
              className="rounded-lg border border-yellow-600 px-8 py-4 text-lg font-bold text-yellow-500 transition hover:bg-yellow-600 hover:text-white"
            >
              Ver Catálogo
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Flecha */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl text-white"
      >
        ↓
      </motion.div>
    </section>
  );
}