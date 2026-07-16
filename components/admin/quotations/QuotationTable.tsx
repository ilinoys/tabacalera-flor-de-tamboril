"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import QuotationActions from "./QuotationActions";
import StatusBadge from "./StatusBadge";

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerId: string;
  customer: {
    customerName: string;
    company?: string | null;
  };
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  notes?: string | null;
  validUntil?: string | null;
  currency: string;
  paymentTerms?: string | null;
  deliveryTime?: string | null;
  incoterm?: string | null;
  salesperson?: string | null;
  createdAt: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
}

export interface QuotationTableHandle {
  reload: () => Promise<void>;
}

interface Props {
  onEdit: (quotation: Quotation) => void;
}

async function fetchQuotations() {
  const response = await fetch("/api/cotizaciones", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar las cotizaciones.");
  }

  return response.json() as Promise<Quotation[]>;
}

const QuotationTable = forwardRef<QuotationTableHandle, Props>(({
  onEdit,
}, ref) => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadQuotations() {
    try {
      const data = await fetchQuotations();

      setQuotations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuotation(quotation: Quotation) {
    const confirmed = window.confirm(
      `Eliminar la cotizacion ${quotation.quotationNumber}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/cotizaciones/${quotation.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "No se pudo eliminar la cotizacion."
        );
      }

      setQuotations((currentQuotations) =>
        currentQuotations.filter(
          (currentQuotation) =>
            currentQuotation.id !== quotation.id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrio un error al eliminar la cotizacion."
      );
    }
  }

  useImperativeHandle(ref, () => ({
    reload: loadQuotations,
  }));

  useEffect(() => {
    void loadQuotations();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center text-white">
        Cargando cotizaciones...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">

      <div className="flex items-center justify-between border-b border-neutral-800 p-6">

        <h2 className="text-2xl font-bold text-white">
          Cotizaciones
        </h2>

        <span className="rounded-full bg-yellow-600 px-4 py-2 font-bold text-white">
          {quotations.length}
        </span>

      </div>

      <table className="w-full">

        <thead className="bg-neutral-950">

          <tr>

            <th className="p-4 text-left text-yellow-500">
              Numero
            </th>

            <th className="p-4 text-left text-yellow-500">
              Cliente
            </th>

            <th className="p-4 text-left text-yellow-500">
              Estado
            </th>

            <th className="p-4 text-left text-yellow-500">
              Total
            </th>

            <th className="p-4 text-left text-yellow-500">
              Fecha
            </th>

            <th className="p-4 text-center text-yellow-500">
              Acciones
            </th>

          </tr>

        </thead>

        <tbody>

          {quotations.map((quotation) => (

            <tr
              key={quotation.id}
              className="border-t border-neutral-800 hover:bg-neutral-800/40"
            >

              <td className="p-4 font-bold text-white">
                {quotation.quotationNumber}
              </td>

              <td className="p-4">

                <div className="font-semibold text-white">
                  {quotation.customer.customerName}
                </div>

                <div className="text-sm text-neutral-400">
                  {quotation.customer.company || "-"}
                </div>

              </td>

              <td className="p-4">
                <StatusBadge status={quotation.status} />
              </td>

              <td className="p-4 text-white">
                US$ {quotation.total.toFixed(2)}
              </td>

              <td className="p-4 text-neutral-300">
                {new Date(
                  quotation.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4">

                <QuotationActions
                  onView={() => {
                    window.location.href =
                      `/admin/cotizaciones/${quotation.id}`;
                  }}
                  onEdit={() => {
                    onEdit(quotation);
                  }}
                  onDuplicate={() => {
                    alert("Proximo Sprint");
                  }}
                  onDelete={() => {
                    void deleteQuotation(quotation);
                  }}
                />

              </td>

            </tr>

          ))}

          {quotations.length === 0 && (

            <tr>

              <td
                colSpan={6}
                className="p-8 text-center text-neutral-400"
              >
                No hay cotizaciones registradas.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
});

QuotationTable.displayName = "QuotationTable";

export default QuotationTable;
