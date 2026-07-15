"use client";

import CustomerForm from "./CustomerForm";

interface Customer {
  id?: string;
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  customerType: string;
}

interface Props {
  open: boolean;
  customer?: Customer | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function CustomerModal({
  open,
  customer,
  onClose,
  onSaved,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            {customer
              ? "Editar Cliente"
              : "Nuevo Cliente"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Cerrar
          </button>

        </div>

        <CustomerForm
          customer={customer}
          onSuccess={() => {
            onSaved();
            onClose();
          }}
        />

      </div>

    </div>
  );
}