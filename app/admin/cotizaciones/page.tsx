"use client";

import { useRef, useState } from "react";

import QuotationModal from "@/components/admin/quotations/QuotationModal";
import QuotationTable, {
  Quotation,
  QuotationTableHandle,
} from "@/components/admin/quotations/QuotationTable";

export default function QuotationsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] =
    useState<Quotation | null>(null);
  const [modalMode, setModalMode] = useState<
    "create" | "edit" | "duplicate"
  >("create");

  const tableRef = useRef<QuotationTableHandle>(null);

  function openQuotationModal() {
    setSelectedQuotation(null);
    setModalMode("create");
    setOpenModal(true);
  }

  function openEditQuotation(quotation: Quotation) {
    setSelectedQuotation(quotation);
    setModalMode("edit");
    setOpenModal(true);
  }

  function openDuplicateQuotation(quotation: Quotation) {
    setSelectedQuotation(quotation);
    setModalMode("duplicate");
    setOpenModal(true);
  }

  function closeQuotationModal() {
    setOpenModal(false);
    setSelectedQuotation(null);
    setModalMode("create");

    tableRef.current?.reload();
  }

  return (
    <>
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
          onDuplicate={openDuplicateQuotation}
        />
      </div>

      <QuotationModal
        key={
          selectedQuotation
            ? `${modalMode}-${selectedQuotation.id}`
            : "new-quotation"
        }
        open={openModal}
        quotation={selectedQuotation}
        mode={modalMode}
        onClose={closeQuotationModal}
      />
    </>
  );
}