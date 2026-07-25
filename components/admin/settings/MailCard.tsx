"use client";

import type {
  Settings,
  UpdateSettingsField,
} from "./SettingsForm";

interface Props {
  form: Settings;
  update: UpdateSettingsField;
}

export default function MailCard({
  form,
  update,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Correo
      </h2>

      <div className="space-y-4">

        <input
          value={form.senderName ?? ""}
          onChange={(e) =>
            update(
              "senderName",
              e.target.value
            )
          }
          placeholder="Nombre del remitente"
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

        <input
          value={form.senderEmail ?? ""}
          onChange={(e) =>
            update(
              "senderEmail",
              e.target.value
            )
          }
          placeholder="Correo remitente"
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
        />

      </div>

    </div>
  );
}
