"use client";

export default function InventarioPage() {
  return (
    <div className="min-h-screen bg-neutral-950 p-4 sm:p-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-lg shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Inventario
            </h1>

            <p className="mt-2 text-sm text-neutral-400 sm:text-base">
              Administración del inventario de la tabacalera.
            </p>
          </div>

          <span className="inline-flex w-fit items-center rounded-full border border-yellow-600/40 bg-yellow-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-yellow-400 sm:text-sm">
            Próximamente
          </span>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-neutral-700 bg-neutral-950/60 p-4 text-sm text-neutral-300 sm:p-6 sm:text-base">
          Próximamente administraremos el inventario de la tabacalera.
        </div>
      </div>
    </div>
  );
}