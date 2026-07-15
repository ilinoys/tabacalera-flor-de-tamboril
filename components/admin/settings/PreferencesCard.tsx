"use client";

interface Props {
  form: any;
  update: (field: string, value: string) => void;
}

export default function PreferencesCard({
  form,
  update,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Preferencias
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <input
          value={form.language ?? ""}
          onChange={(e) =>
            update("language", e.target.value)
          }
          placeholder="Idioma"
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

        <input
          value={form.timezone ?? ""}
          onChange={(e) =>
            update("timezone", e.target.value)
          }
          placeholder="Zona Horaria"
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

      </div>

    </div>
  );
}