"use client";

import { useState } from "react";

import CustomerTable, {
  Customer,
} from "@/components/admin/customers/CustomerTable";
import CustomerModal from "@/components/admin/customers/CustomerModal";

export default function ClientesPage() {
  const [openModal, setOpenModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [reloadKey, setReloadKey] = useState(0);

  function reloadCustomers() {
    setReloadKey((current) => current + 1);
  }

  function newCustomer() {
    setSelectedCustomer(null);
    setOpenModal(true);
  }

  function editCustomer(customer: Customer) {
    setSelectedCustomer(customer);
    setOpenModal(true);
  }

  return (
    <div className="p-10">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Clientes
          </h1>

          <p className="mt-3 text-neutral-400">
            Administra todos los clientes registrados en Flor de Tamboril.
          </p>
        </div>

        <button
          onClick={newCustomer}
          className="rounded-xl bg-yellow-600 px-8 py-4 font-bold text-white hover:bg-yellow-500"
        >
          + Nuevo Cliente
        </button>
      </div>

      <CustomerTable
        reloadKey={reloadKey}
        onEdit={editCustomer}
      />

      <CustomerModal
        open={openModal}
        customer={selectedCustomer}
        onClose={() => {
          setOpenModal(false);
          setSelectedCustomer(null);
        }}
        onSaved={reloadCustomers}
      />
    </div>
  );
}