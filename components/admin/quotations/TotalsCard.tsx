"use client";

interface Props {
  subtotal: number;
  discount: number;
  onDiscountChange: (value: number) => void;
}

export default function TotalsCard({
  subtotal,
  discount,
  onDiscountChange,
}: Props) {
  const total = subtotal - discount;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Resumen
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <span className="text-neutral-400">
            Subtotal
          </span>

          <span className="font-bold text-white">
            US$ {subtotal.toFixed(2)}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-neutral-400">
            Descuento
          </span>

          <input
            type="number"
            min={0}
            max={subtotal}
            value={discount}
            onChange={(e) =>
              onDiscountChange(Number(e.target.value))
            }
            className="w-32 rounded-lg border border-neutral-700 bg-black px-3 py-2 text-right text-white"
          />

        </div>

        <div className="border-t border-neutral-800 pt-5">

          <div className="flex items-center justify-between">

            <span className="text-xl font-bold text-white">
              TOTAL
            </span>

            <span className="text-3xl font-bold text-yellow-500">
              US$ {total.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}