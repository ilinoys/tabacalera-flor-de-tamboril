"use client";

interface Props {
  form: any;
  update: (field: string, value: string) => void;
}

export default function CommercialCard({
  form,
  update,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Información Comercial
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <input
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
          placeholder="Correo"
          value={form.email}
          onChange={(e) =>
            update("email", e.target.value)
          }
        />

        <input
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) =>
            update("phone", e.target.value)
          }
        />

        <input
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
          placeholder="Celular"
          value={form.mobile}
          onChange={(e) =>
            update("mobile", e.target.value)
          }
        />

        <input
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
          placeholder="WhatsApp"
          value={form.whatsapp ?? ""}
          onChange={(e) =>
            update("whatsapp", e.target.value)
          }
        />

        <input
          className="rounded-lg border border-neutral-700 bg-black p-3 text-white md:col-span-2"
          placeholder="Sitio web"
          value={form.website}
          onChange={(e) =>
            update("website", e.target.value)
          }
        />

      </div>

    </div>
  );
}