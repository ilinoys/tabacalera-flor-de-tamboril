"use client";

import type {
  Settings,
  UpdateSettingsField,
} from "./SettingsForm";

interface Props {
  form: Settings;
  update: UpdateSettingsField;
  saving: boolean;
  onSave: () => void;
}

export default function ExchangeRateCard({
  form,
  update,
  saving,
  onSave,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Tasa de Cambio
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Moneda base
          </label>

          <input
            className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
            value="USD"
            readOnly
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Moneda destino
          </label>

          <input
            className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
            value="DOP"
            readOnly
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Tasa
          </label>

          <input
            type="number"
            min={0}
            step="0.01"
            className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white"
            placeholder="61.50"
            value={form.exchangeRate}
            onChange={(e) =>
              update("exchangeRate", Number(e.target.value))
            }
          />
        </div>

      </div>

      <div className="mt-6 flex justify-end">

        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-xl bg-yellow-600 px-8 py-3 font-bold text-white hover:bg-yellow-500 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>

      </div>

    </div>
  );
}
