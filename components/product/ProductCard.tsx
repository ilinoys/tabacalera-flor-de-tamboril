"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition duration-300 hover:border-yellow-500 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="h-80 w-full object-cover transition duration-500 sm:group-hover:scale-110"
        />

        <div className="absolute inset-0 flex items-end justify-center gap-4 bg-black/30 p-4 opacity-100 transition duration-300 sm:items-center sm:bg-black/60 sm:opacity-0 sm:group-hover:opacity-100">
          <Link
            href={`/producto/${product.id}`}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-yellow-500 p-3 text-black transition hover:scale-110"
            aria-label={`Ver ${product.name}`}
          >
            <Eye size={22} />
          </Link>

          <AddToCartButton
            product={product}
            iconOnly
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white p-3 text-black transition hover:scale-110"
          />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-2 text-neutral-400">
          {product.description}
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-3xl font-bold text-yellow-500">
            US$ {product.price.toFixed(2)}
          </span>

          <Link
            href={`/producto/${product.id}`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-yellow-600 px-5 py-3 font-semibold text-white transition hover:bg-yellow-500"
          >
            Ver mas
          </Link>
        </div>
      </div>
    </div>
  );
}
