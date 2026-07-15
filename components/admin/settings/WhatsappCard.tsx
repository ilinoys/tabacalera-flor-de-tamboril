"use client";

interface Props {
  form: any;
  update: (field: string, value: string) => void;
}

export default function WhatsappCard({
  form,
  update,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        WhatsApp
      </h2>

      <div className="space-y-4">

        <input
          value={form.whatsapp ?? ""}
          onChange={(e) =>
            update("whatsapp", e.target.value)
          }
          placeholder="Número oficial"
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

        <textarea
          rows={5}
          value={form.whatsappMessage ?? ""}
          onChange={(e) =>
            update(
              "whatsappMessage",
              e.target.value
            )
          }
          placeholder="Mensaje predeterminado"
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

      </div>

    </div>
  );
}