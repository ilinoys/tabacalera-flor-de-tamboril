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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-8">
      <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 p-4 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {customer ? "Editar Cliente" : "Nuevo Cliente"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white sm:px-4"
          >
            Cerrar
          </button>
        </div>

        <CustomerForm
          key={customer?.id ?? "new-customer"}
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
