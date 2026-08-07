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
     <div className="absolute inset-0 bg-black/70" />

     <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
       <div className="max-w-4xl text-center">
         <motion.h2
           initial={{ opacity: 0, y: -30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-xs uppercase tracking-[6px] text-yellow-500 sm:text-sm md:text-base"
         >
           República Dominicana
         </motion.h2>

         <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2, duration: 0.6 }}
           className="mt-5 mb-5 flex justify-center sm:mt-6 sm:mb-6"
         >
           <Image
             src="/images/logo/logo.png"
             alt="Logo Tabacalera Flor De Tamboril"
             width={120}
             height={120}
             priority
             className="h-20 w-20 sm:h-[140px] sm:w-[140px]"
           />
         </motion.div>

         <motion.h1
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="text-4xl font-bold text-white sm:text-5xl md:text-7xl"
         >
           Tabacalera
           <br />
           <span className="text-yellow-500">
             Flor De Tamboril
           </span>
         </motion.h1>

         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="mx-auto mt-6 max-w-3xl text-base leading-7 text-neutral-300 sm:mt-8 sm:text-lg md:text-xl md:leading-8"
         >
           Elaboramos puros dominicanos de la más alta calidad,
           combinando tradición artesanal con una cuidadosa selección
           de hojas de tabaco premium.
         </motion.p>

         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
           className="mt-8 flex flex-col justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-6"
         >
           <Link
             href="/tienda"
             className="rounded-lg bg-yellow-600 px-6 py-3 text-base font-bold text-white transition hover:bg-yellow-500 hover:scale-105 sm:px-8 sm:py-4 sm:text-lg"
           >
             Comprar Ahora
           </Link>

           <Link
             href="/tienda"
             className="rounded-lg border border-yellow-600 px-6 py-3 text-base font-bold text-yellow-500 transition hover:bg-yellow-600 hover:text-white sm:px-8 sm:py-4 sm:text-lg"
           >
             Ver Catálogo
           </Link>
         </motion.div>
       </div>
     </div>

     <motion.div
       animate={{ y: [0, 12, 0] }}
       transition={{
         repeat: Infinity,
         duration: 1.5,
       }}
       className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl text-white sm:text-4xl"
     >
       ↓
     </motion.div>
   </section>
 );
}