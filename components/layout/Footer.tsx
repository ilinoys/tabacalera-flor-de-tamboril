import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-center text-neutral-400 md:flex-row">

        <div>
          <h2 className="text-xl font-bold text-yellow-500">
            Tabacalera Flor De Tamboril
          </h2>

          <p className="mt-2">
            Puros dominicanos de calidad premium.
          </p>
        </div>

        <div className="flex gap-6">
          <Link href="/">Inicio</Link>
          <Link href="/tienda">Tienda</Link>
        </div>

        <p>
          © 2026 Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
}