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
}

export default function ProductsTable({
  items,
}: Props) {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">

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
              Precio
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
              className="border-t border-neutral-800"
            >

              <td className="p-4 text-white">
                {item.product.name}
              </td>

              <td className="p-4 text-center text-white">
                {item.quantity}
              </td>

              <td className="p-4 text-right text-white">
                US$ {item.price.toFixed(2)}
              </td>

              <td className="p-4 text-right font-bold text-yellow-500">
                US$ {(item.price * item.quantity).toFixed(2)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}