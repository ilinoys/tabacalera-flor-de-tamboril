"use client";

import { useRef, useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

import QuotationModal from "@/components/admin/quotations/QuotationModal";
import QuotationTable, {
  Quotation,
  QuotationTableHandle,
} from "@/components/admin/quotations/QuotationTable";

export default function QuotationsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] =
    useState<Quotation | null>(null);

  const tableRef = useRef<QuotationTableHandle>(null);

  function openQuotationModal() {
    setSelectedQuotation(null);
    setOpenModal(true);
  }

  function openEditQuotation(quotation: Quotation) {
    setSelectedQuotation(quotation);
    setOpenModal(true);
  }

  function closeQuotationModal() {
    setOpenModal(false);
    setSelectedQuotation(null);

    tableRef.current?.reload();
  }

  return (
    <main className="flex min-h-screen bg-black">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <div className="space-y-8 p-10">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold text-white">
                Cotizaciones
              </h1>

              <p className="mt-2 text-neutral-400">
                Administración de cotizaciones.
              </p>

            </div>

            <button
              onClick={openQuotationModal}
              className="rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500"
            >
              + Nueva Cotización
            </button>

          </div>

          <QuotationTable
            ref={tableRef}
            onEdit={openEditQuotation}
          />

        </div>

      </div>

      <QuotationModal
        key={selectedQuotation?.id ?? "new-quotation"}
        open={openModal}
        quotation={selectedQuotation}
        onClose={closeQuotationModal}
      />

    </main>
  );
}
