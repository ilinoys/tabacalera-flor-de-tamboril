"use client";

import { useState } from "react";

import ProductTable from "@/components/admin/products/ProductTable";
import ProductToolbar from "@/components/admin/products/ProductToolbar";
import ProductModal from "@/components/admin/modals/ProductModal";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

export default function ProductosPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [search, setSearch] = useState("");

  function handleNewProduct() {
    setSelectedProduct(null);
    setOpenModal(true);
  }

  function handleEditProduct(product: Product) {
    setSelectedProduct(product);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setSelectedProduct(null);
    setOpenModal(false);
  }

  return (
    <div className="p-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Productos
      </h1>

      <ProductToolbar
        onNewProduct={handleNewProduct}
        onSearch={setSearch}
        search={search}
      />

      <ProductTable
        onEdit={handleEditProduct}
        search={search}
      />

      <ProductModal
        open={openModal}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </div>
  );
}