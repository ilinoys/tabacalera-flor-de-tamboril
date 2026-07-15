import ProductCard from "@/components/product/ProductCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProducts } from "@/services/productService";

export default async function TiendaPage() {
  const products = await getProducts();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Título */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500">
              Nuestra Tienda
            </h1>
            <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
              Descubre nuestra colección completa de puros artesanales,
              elaborados con la mejor selección de hojas de tabaco dominicano.
            </p>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
