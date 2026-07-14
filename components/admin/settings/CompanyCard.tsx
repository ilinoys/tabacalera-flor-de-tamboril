import SettingsCard from "./SettingsCard";

export default function CompanyCard() {
  return (
    <SettingsCard
      title="Información de la Empresa"
      description="Estos datos serán utilizados automáticamente en cotizaciones, pedidos, PDFs, correos y demás módulos del ERP."
    >
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-300">
            Nombre de la Empresa
          </label>

          <input
            type="text"
            value="Flor de Tamboril"
            readOnly
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-300">
            RNC
          </label>

          <input
            type="text"
            placeholder="Pendiente"
            readOnly
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-300">
            Teléfono
          </label>

          <input
            type="text"
            value="809-570-9860"
            readOnly
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-300">
            Celular
          </label>

          <input
            type="text"
            value="829-898-6214"
            readOnly
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-300">
            Ciudad
          </label>

          <input
            type="text"
            value="Tamboril"
            readOnly
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-300">
            Provincia
          </label>

          <input
            type="text"
            value="Santiago"
            readOnly
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
          />
        </div>

      </div>
    </SettingsCard>
  );
}