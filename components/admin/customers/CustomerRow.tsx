"use client";

import { useRouter } from "next/navigation";

import CustomerActions from "./CustomerActions";
import type { Customer } from "./CustomerTable";

interface Props {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDeleted: (id: string) => void;
}

export default function CustomerRow({
  customer,
  onEdit,
  onDeleted,
}: Props) {
  const router = useRouter();

  async function deleteCustomer() {
    const confirmDelete = confirm(
      `¿Eliminar el cliente "${customer.customerName}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/clientes/${customer.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "No se pudo eliminar el cliente."
        );
      }

      onDeleted(customer.id);

      alert("Cliente eliminado correctamente.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrió un error."
      );
    }
  }

  return (
    <tr className="border-t border-neutral-800 hover:bg-neutral-800/40">

      <td className="p-4">

        <div className="font-semibold text-white">
          {customer.customerName}
        </div>

        <div className="text-sm text-neutral-400">
          {customer.email}
        </div>

      </td>

      <td className="p-4 text-white">
        {customer.company || "-"}
      </td>

      <td className="p-4 text-white">
        {customer.country}
      </td>

      <td className="p-4">

        <span className="rounded-full bg-yellow-600 px-3 py-1 text-sm font-bold text-white">
          {customer.customerType}
        </span>

      </td>

      <td className="p-4">

        <CustomerActions
          onView={() =>
            router.push(
              `/admin/clientes/${customer.id}`
            )
          }
          onEdit={() => onEdit(customer)}
          onDelete={deleteCustomer}
        />

      </td>

    </tr>
  );
}