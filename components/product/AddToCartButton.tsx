"use client";

import { ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  iconOnly?: boolean;
}

export default function AddToCartButton({
  product,
  className = "",
  iconOnly = false,
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className={className}
      aria-label={`Agregar ${product.name} al carrito`}
    >
      <ShoppingCart size={iconOnly ? 22 : 20} />
      {!iconOnly && <span>Agregar al carrito</span>}
    </button>
  );
}
