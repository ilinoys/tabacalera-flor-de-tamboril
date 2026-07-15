"use client";

interface Props {
  form: any;
  update: (field: string, value: string) => void;
}

export default function ExportCard({
  form,
  update,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Exportación
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        <input
          placeholder="Puerto de salida"
          value={form.exportPort ?? ""}
          onChange={(e)=>
            update("exportPort",e.target.value)
          }
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

        <input
          placeholder="Puerto destino"
          value={form.destinationPort ?? ""}
          onChange={(e)=>
            update("destinationPort",e.target.value)
          }
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

        <input
          placeholder="País principal"
          value={form.exportCountry ?? ""}
          onChange={(e)=>
            update("exportCountry",e.target.value)
          }
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

      </div>

    </div>
  );
}