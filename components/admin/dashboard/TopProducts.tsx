interface Product {
  id: string;
  name: string;
  quantity: number;
}

interface Props {
  loading: boolean;
  products: Product[];
}

export default function TopProducts({
  loading,
  products,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Productos Más Solicitados
      </h2>

      {loading ? (
        <p className="text-neutral-400">
          Cargando...
        </p>
      ) : products.length === 0 ? (
        <p className="text-neutral-400">
          Aún no hay pedidos.
        </p>
      ) : (
        <div className="space-y-4">

          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-black p-4"
            >
              <div>

                <p className="font-semibold text-white">
                  #{index + 1} {product.name}
                </p>

              </div>

              <span className="rounded-full bg-yellow-600 px-4 py-1 font-bold text-white">
                {product.quantity}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}