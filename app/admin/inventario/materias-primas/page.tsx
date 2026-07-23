"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import RawMaterialModal from "@/components/admin/raw-materials/RawMaterialModal";
import RawMaterialTable from "@/components/admin/raw-materials/RawMaterialTable";
import RawMaterialToolbar from "@/components/admin/raw-materials/RawMaterialToolbar";
import type { RawMaterial } from "@/components/admin/raw-materials/types";

export default function MateriasPrimasPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRawMaterial, setSelectedRawMaterial] =
    useState<RawMaterial | null>(null);
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  function handleNewRawMaterial() {
    setSelectedRawMaterial(null);
    setOpenModal(true);
  }

  function handleEditRawMaterial(rawMaterial: RawMaterial) {
    setSelectedRawMaterial(rawMaterial);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setSelectedRawMaterial(null);
    setOpenModal(false);
    setRefreshKey((current) => current + 1);
  }

  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-10">
          <h1 className="mb-8 text-4xl font-bold text-white">
            Materias Primas
          </h1>

          <RawMaterialToolbar
            search={search}
            onSearchChange={setSearch}
            onNewRawMaterial={handleNewRawMaterial}
          />

          <RawMaterialTable
            search={search}
            refreshKey={refreshKey}
            onEdit={handleEditRawMaterial}
          />

          <RawMaterialModal
            open={openModal}
            rawMaterial={selectedRawMaterial}
            onClose={handleCloseModal}
          />
        </div>
      </div>
    </main>
  );
}
