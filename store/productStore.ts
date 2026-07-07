import { create } from "zustand";
import { Product } from "@/lib/products";

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
}

import { products as initialProducts } from "@/lib/products";

export const useProductStore = create<ProductStore>((set) => ({
  products: initialProducts,

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? product : p
      ),
    })),
}));