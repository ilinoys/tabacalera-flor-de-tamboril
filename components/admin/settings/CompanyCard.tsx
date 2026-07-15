"use client";

interface Props {
  form: any;
  update: (field: string, value: string) => void;
}

export default function CompanyCard({
  form,
  update,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Empresa
      </h2>

      <div className="space-y-4">

        <input
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
          placeholder="Nombre de la empresa"
          value={form.companyName}
          onChange={(e) =>
            update("companyName", e.target.value)
          }
        />

        <input
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
          placeholder="Eslogan"
          value={form.slogan}
          onChange={(e) =>
            update("slogan", e.target.value)
          }
        />

        <input
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
          placeholder="RNC"
          value={form.rnc}
          onChange={(e) =>
            update("rnc", e.target.value)
          }
        />

        <input
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
          placeholder="Dirección"
          value={form.address}
          onChange={(e) =>
            update("address", e.target.value)
          }
        />

      </div>

    </div>
  );
}