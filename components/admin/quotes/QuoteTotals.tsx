interface Props {
  subtotal: number;
}

export default function QuoteTotals({
  subtotal,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Resumen
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span className="text-neutral-300">
            Subtotal
          </span>

          <span className="font-bold text-white">
            US$ {subtotal.toFixed(2)}
          </span>

        </div>

        <div className="border-t border-neutral-800 pt-4">

          <div className="flex justify-between">

            <span className="text-xl font-bold text-white">
              Total
            </span>

            <span className="text-2xl font-bold text-yellow-500">
              US$ {subtotal.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}