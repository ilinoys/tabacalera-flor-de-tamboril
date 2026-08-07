import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { getFeaturedProducts } from "@/services/productService";

export default async function Featured() {
  const featured = await getFeaturedProducts();

  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-2xl font-bold text-yellow-500 sm:text-3xl md:text-4xl">
            Productos Destacados
          </h2>
          <p className="mt-3 text-sm text-neutral-400 sm:mt-4 sm:text-base">
            Nuestros puros más selectos, elegidos para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <Link
            href="/tienda"
            className="inline-block rounded-md border-2 border-yellow-600 px-6 py-3 text-base font-semibold text-yellow-500 transition hover:bg-yellow-600 hover:text-white sm:px-8 sm:text-lg"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
}
