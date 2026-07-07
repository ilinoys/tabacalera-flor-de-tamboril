"use client";

import { useState } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductTable from "@/components/admin/products/ProductTable";
import ProductToolbar from "@/components/admin/products/ProductToolbar";
import ProductModal from "@/components/admin/modals/ProductModal";

export default function ProductosPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-10">
          <h1 className="mb-8 text-4xl font-bold text-white">
            Productos
          </h1>

          <ProductToolbar
            onNewProduct={() => setOpenModal(true)}
          />

          <ProductTable />

          <ProductModal
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>
      </div>
    </main>
  );
}