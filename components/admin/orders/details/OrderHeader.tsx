interface Props {
  createdAt: string;
  status: string;
}

export default function OrderHeader({
  createdAt,
  status,
}: Props) {
  return (
    <div className="mb-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-yellow-500">
            Pedido
          </h1>

          <p className="mt-2 text-neutral-400">
            {new Date(createdAt).toLocaleDateString()}
          </p>

        </div>

        <span className="rounded-full bg-yellow-600 px-5 py-2 font-bold text-white">
          {status}
        </span>

      </div>

    </div>
  );
}