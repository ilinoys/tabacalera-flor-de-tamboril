import { products } from "@/lib/products";

export default function ProductTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">

      <table className="w-full">

        <thead className="bg-neutral-950">

          <tr>

            <th className="p-4 text-left text-yellow-500">Producto</th>

            <th className="p-4 text-left text-yellow-500">Categoría</th>

            <th className="p-4 text-left text-yellow-500">Fortaleza</th>

            <th className="p-4 text-left text-yellow-500">Precio</th>

            <th className="p-4 text-left text-yellow-500">Origen</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-neutral-800 hover:bg-neutral-800"
            >
              <td className="p-4">{product.name}</td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">{product.strength}</td>

              <td className="p-4">
                US$ {product.price.toFixed(2)}
              </td>

              <td className="p-4">{product.origin}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}