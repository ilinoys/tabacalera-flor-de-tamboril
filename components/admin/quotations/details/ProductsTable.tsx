import { formatExchangeCurrency } from "@/lib/exchange";

interface Item {
  id: string;
  quantity: number;
  price: number;

  product: {
    name: string;
  };
}

interface Props {
  items: Item[];
  currency: string;
  exchangeRate: number;
}

export default function ProductsTable({
  items,
  currency,
  exchangeRate,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">

      <div className="border-b border-neutral-800 p-6">

        <h3 className="text-2xl font-bold text-yellow-500">
          Productos Cotizados
        </h3>

      </div>

      <table className="w-full">

        <thead className="bg-black">

          <tr>

            <th className="p-4 text-left text-yellow-500">
              Producto
            </th>

            <th className="p-4 text-center text-yellow-500">
              Cantidad
            </th>

            <th className="p-4 text-right text-yellow-500">
              Precio Unitario
            </th>

            <th className="p-4 text-right text-yellow-500">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {items.map((item) => (

            <tr
              key={item.id}
              className="border-t border-neutral-800 hover:bg-neutral-800/40"
            >

              <td className="p-4 font-medium text-white">
                {item.product.name}
              </td>

              <td className="p-4 text-center text-white">
                {item.quantity}
              </td>

              <td className="p-4 text-right text-white">
                {formatExchangeCurrency(
                  item.price,
                  currency,
                  exchangeRate
                )}
              </td>

              <td className="p-4 text-right font-bold text-yellow-500">
                {formatExchangeCurrency(
                  item.quantity * item.price,
                  currency,
                  exchangeRate
                )}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
