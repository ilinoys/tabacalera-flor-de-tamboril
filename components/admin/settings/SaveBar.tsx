interface Props {
  saving?: boolean;
}

export default function SaveBar({
  saving = false,
}: Props) {
  return (
    <div className="sticky bottom-0 mt-10 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="font-bold text-white">
            Configuración
          </h3>

          <p className="text-sm text-neutral-400">
            Los cambios realizados aquí afectarán todo el ERP.
          </p>

        </div>

        <button
          disabled
          className="rounded-xl bg-yellow-600 px-8 py-3 font-bold text-white opacity-60"
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>

      </div>

    </div>
  );
}