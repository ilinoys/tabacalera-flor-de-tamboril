"use client";

import { useState } from "react";

import ProductTable from "@/components/admin/products/ProductTable";
import ProductToolbar from "@/components/admin/products/ProductToolbar";
import ProductModal from "@/components/admin/modals/ProductModal";
import ImportProductsModal from "@/components/admin/products/ImportProductsModal";

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
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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

  const [importedAt, setImportedAt] = useState<number>(0);

  function handleImportProducts() {
    setIsImportModalOpen(true);
  }

  function handleCloseImportModal() {
    setIsImportModalOpen(false);
  }

  function handleImportSuccess() {
    // signal product table to reload
    setImportedAt(Date.now());
    setIsImportModalOpen(false);
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
        onImportProducts={handleImportProducts}
      />

      <ProductTable
        onEdit={handleEditProduct}
        search={search}
        reloadSignal={importedAt}
      />

      <ProductModal
        open={openModal}
        product={selectedProduct}
        onClose={handleCloseModal}
      />

      <ImportProductsModal
        open={isImportModalOpen}
        onClose={handleCloseImportModal}
        onSuccess={handleImportSuccess}
      />
    </div>
  );
}