export default function FooterInfo() {
  return (
    <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="grid gap-10 md:grid-cols-2">

        <div>

          <h3 className="mb-4 text-xl font-bold text-yellow-500">
            Observaciones
          </h3>

          <p className="leading-7 text-neutral-300">
            Esta cotización tiene una validez de 15 días a partir
            de la fecha de emisión. Los precios pueden variar
            según disponibilidad y condiciones del mercado.
          </p>

        </div>

        <div>

          <h3 className="mb-4 text-xl font-bold text-yellow-500">
            Información Comercial
          </h3>

          <div className="space-y-2 text-neutral-300">

            <p>Flor de Tamboril</p>

            <p>Tamboril, Santiago</p>

            <p>República Dominicana</p>

            <p>info@flordetamboril.com</p>

            <p>www.flordetamboril.com</p>

          </div>

        </div>

      </div>

      <div className="mt-10 border-t border-neutral-800 pt-8">

        <div className="grid gap-8 md:grid-cols-3">

          <div className="text-center">

            <div className="mx-auto mb-3 h-px w-40 bg-neutral-600"></div>

            <p className="text-sm text-neutral-400">
              Firma Autorizada
            </p>

          </div>

          <div className="text-center">

            <div className="mx-auto mb-3 h-px w-40 bg-neutral-600"></div>

            <p className="text-sm text-neutral-400">
              Sello de la Empresa
            </p>

          </div>

          <div className="text-center">

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-lg border border-dashed border-neutral-700 text-center text-xs text-neutral-500">
              Código QR
            </div>

            <p className="mt-2 text-sm text-neutral-400">
              Verificación
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}