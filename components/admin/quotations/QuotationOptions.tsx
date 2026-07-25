"use client";

interface Props {
  validUntil: string;
  onValidUntilChange: (value: string) => void;

  currency: string;
  onCurrencyChange: (value: string) => void;

  paymentTerms: string;
  onPaymentTermsChange: (value: string) => void;

  deliveryTime: string;
  onDeliveryTimeChange: (value: string) => void;

  incoterm: string;
  onIncotermChange: (value: string) => void;

  salesperson: string;
  onSalespersonChange: (value: string) => void;
}

export default function QuotationOptions({
  validUntil,
  onValidUntilChange,
  currency,
  onCurrencyChange,
  paymentTerms,
  onPaymentTermsChange,
  deliveryTime,
  onDeliveryTimeChange,
  incoterm,
  onIncotermChange,
  salesperson,
  onSalespersonChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

      <h3 className="mb-6 text-xl font-bold text-yellow-500">
        Información Comercial
      </h3>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Válida hasta
          </label>

          <input
            type="date"
            value={validUntil}
            onChange={(e) =>
              onValidUntilChange(e.target.value)
            }
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Moneda
          </label>

          <select
            value={currency}
            onChange={(e) =>
              onCurrencyChange(e.target.value)
            }
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          >
            <option value="USD">USD</option>
            <option value="DOP">DOP</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Incoterm
          </label>

          <select
            value={incoterm}
            onChange={(e) =>
              onIncotermChange(e.target.value)
            }
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          >
            <option value="">Seleccionar</option>
            <option value="EXW">EXW</option>
            <option value="FOB">FOB</option>
            <option value="CIF">CIF</option>
            <option value="CFR">CFR</option>
            <option value="DDP">DDP</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Tiempo de entrega
          </label>

          <input
            type="text"
            value={deliveryTime}
            onChange={(e) =>
              onDeliveryTimeChange(e.target.value)
            }
            placeholder="30 días"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-neutral-300">
            Condiciones de pago
          </label>

          <textarea
            rows={3}
            value={paymentTerms}
            onChange={(e) =>
              onPaymentTermsChange(e.target.value)
            }
            placeholder="50% anticipado y 50% antes del embarque..."
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-neutral-300">
            Vendedor
          </label>

          <input
            type="text"
            value={salesperson}
            onChange={(e) =>
              onSalespersonChange(e.target.value)
            }
            placeholder="Nombre del vendedor"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

      </div>

    </div>
  );
}
