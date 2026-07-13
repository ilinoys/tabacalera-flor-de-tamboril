interface Props {
  subtotal: number;
  discount: number;
  total: number;
}

export default function TotalsCard({
  subtotal,
  discount,
  total,
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
            US$ {subtotal.toFixed(2)}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-neutral-400">
            Descuento
          </span>

          <span className="text-white">
            US$ {discount.toFixed(2)}
          </span>

        </div>

        <div className="border-t border-neutral-700 pt-5">

          <div className="flex justify-between">

            <span className="text-2xl font-bold text-yellow-500">
              TOTAL
            </span>

            <span className="text-2xl font-bold text-yellow-500">
              US$ {total.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}