"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition duration-300 hover:border-yellow-500 hover:shadow-2xl">

      <div className="relative overflow-hidden">

        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition duration-300 group-hover:opacity-100">

          <Link
            href={`/producto/${product.id}`}
            className="rounded-full bg-yellow-500 p-3 text-black transition hover:scale-110"
          >
            <Eye size={22} />
          </Link>

          <button
  onClick={() => {
    console.log("CLICK");
    addToCart(product);
  }}
  className="rounded-full bg-white p-3 text-black transition hover:scale-110"
>
  <ShoppingCart size={22} />
</button>

        </div>

      </div>

      <div className="p-6">

        <h3 className="text-2xl font-bold text-white">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-2 text-neutral-400">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <span className="text-3xl font-bold text-yellow-500">
            US$ {product.price.toFixed(2)}
          </span>

          <Link
            href={`/producto/${product.id}`}
            className="rounded-lg bg-yellow-600 px-5 py-3 font-semibold text-white transition hover:bg-yellow-500"
          >
            Ver más
          </Link>

        </div>

      </div>

    </div>
  );
}
