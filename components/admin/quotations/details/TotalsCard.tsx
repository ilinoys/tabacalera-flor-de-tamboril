import { formatCurrency } from "@/lib/currency";

interface Props {
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
}

export default function TotalsCard({
  subtotal,
  discount,
  total,
  currency,
}: Props) {
  return (
    <div className="ml-auto mt-10 w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h3 className="mb-6 text-2xl font-bold text-yellow-500">
        Resumen
      </h3>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="text-neutral-400">
            Subtotal
          </span>

          <span className="text-white">
            {formatCurrency(subtotal, currency)}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-neutral-400">
            Descuento
          </span>

          <span className="text-white">
            {formatCurrency(discount, currency)}
          </span>

        </div>

        <div className="border-t border-neutral-700 pt-5">

          <div className="flex justify-between">

            <span className="text-2xl font-bold text-yellow-500">
              TOTAL
            </span>

            <span className="text-2xl font-bold text-yellow-500">
              {formatCurrency(total, currency)}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
