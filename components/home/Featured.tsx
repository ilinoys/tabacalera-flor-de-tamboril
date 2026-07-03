import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

export default function Featured() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
            Productos Destacados
          </h2>
          <p className="mt-4 text-neutral-400">
            Nuestros puros más selectos, elegidos para ti.
          </p>
        </div>

        {/* Grid de productos destacados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Botón ver todos */}
        <div className="mt-12 text-center">
          <Link
            href="/tienda"
            className="inline-block rounded-md border-2 border-yellow-600 px-8 py-3 text-lg font-semibold text-yellow-500 transition hover:bg-yellow-600 hover:text-white"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
}
