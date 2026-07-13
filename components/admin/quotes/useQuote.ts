"use client";

import { useMemo, useState } from "react";
import type { QuoteItem } from "@/types/quote";

export function useQuote() {
  const [items, setItems] = useState<QuoteItem[]>([]);

  function addProduct(product: {
    id: string;
    name: string;
    price: number;
    stock: number;
  }) {
    setItems((current) => {
      const existing = current.find((p) => p.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function removeProduct(id: string) {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function changeQuantity(id: string, quantity: number) {
    if (quantity < 1) return;

    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  }

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [items]);

  return {
    items,
    subtotal,
    addProduct,
    removeProduct,
    changeQuantity,
  };
}