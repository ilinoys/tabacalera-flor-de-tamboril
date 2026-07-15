import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/services/productService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        <Link
          href="/tienda"
          className="text-yellow-500 hover:underline"
        >
          ← Volver a la tienda
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mt-10">

          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={700}
            className="rounded-2xl object-cover w-full"
          />

          <div>

            <span className="text-yellow-500 uppercase">
              {product.category}
            </span>

            <h1 className="mt-4 text-5xl font-bold">
              {product.name}
            </h1>

            <p className="mt-6 text-neutral-300 leading-8">
              {product.description}
            </p>

            <div className="mt-8 space-y-3">

              <p>
                <strong>Fortaleza:</strong> {product.strength}
              </p>

              <p>
                <strong>Origen:</strong> {product.origin}
              </p>

              <p>
                <strong>Vitola:</strong> {product.size}
              </p>

            </div>

            <h2 className="mt-10 text-4xl font-bold text-yellow-500">
              US$ {product.price}
            </h2>

            <button
              className="mt-8 rounded-lg bg-yellow-600 px-8 py-4 text-lg font-bold hover:bg-yellow-500"
            >
              Agregar al carrito
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}
