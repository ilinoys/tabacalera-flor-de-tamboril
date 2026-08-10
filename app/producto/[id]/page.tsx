import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/product/AddToCartButton";
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
    <main className="min-h-screen bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/tienda"
          className="text-yellow-500 hover:underline"
        >
          Volver a la tienda
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={700}
            className="h-auto w-full rounded-2xl bg-black object-contain"
          />

          <div>
            <span className="text-yellow-500 uppercase">
              {product.category}
            </span>

            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-6 leading-8 text-neutral-300">
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

            <AddToCartButton
              product={product}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-yellow-600 px-8 py-4 text-lg font-bold text-white hover:bg-yellow-500"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
