"use client";

import {
  convertFromUsd,
  convertToUsd,
  formatExchangeCurrency,
} from "@/lib/exchange";

interface Props {
  subtotal: number;
  discount: number;
  currency: string;
  exchangeRate: number;
  onDiscountChange: (value: number) => void;
}

export default function TotalsCard({
  subtotal,
  discount,
  currency,
  exchangeRate,
  onDiscountChange,
}: Props) {
  const total = subtotal - discount;
  const displayedDiscount = convertFromUsd(
    discount,
    currency,
    exchangeRate
  );
  const displayedSubtotal = convertFromUsd(
    subtotal,
    currency,
    exchangeRate
  );

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
            {formatExchangeCurrency(
              subtotal,
              currency,
              exchangeRate
            )}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-neutral-400">
            Descuento
          </span>

          <input
            type="number"
            min={0}
            max={displayedSubtotal}
            value={displayedDiscount}
            onChange={(e) =>
              onDiscountChange(
                convertToUsd(
                  Number(e.target.value),
                  currency,
                  exchangeRate
                )
              )
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
              {formatExchangeCurrency(
                total,
                currency,
                exchangeRate
              )}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
