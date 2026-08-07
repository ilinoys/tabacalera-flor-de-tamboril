import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-neutral-400 sm:gap-6 sm:px-6 md:flex-row md:py-10">
        <div>
          <h2 className="text-lg font-bold text-yellow-500 sm:text-xl">
            Tabacalera Flor De Tamboril
          </h2>

          <p className="mt-2 text-sm sm:text-base">
            Puros dominicanos de calidad premium.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm sm:gap-6">
          <Link href="/">Inicio</Link>
          <Link href="/tienda">Tienda</Link>
        </div>

        <p className="text-sm sm:text-base">
          © 2026 Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}