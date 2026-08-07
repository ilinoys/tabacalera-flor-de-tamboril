"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import {
  DEFAULT_EXCHANGE_RATE,
  formatExchangeCurrency,
} from "@/lib/exchange";

import QuotationActions from "./QuotationActions";
import StatusBadge from "./StatusBadge";

const QUOTATION_STATUSES = [
  "BORRADOR",
  "ENVIADA",
  "ACEPTADA",
  "RECHAZADA",
  "EXPIRADA",
] as const;

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
  onDuplicate: (quotation: Quotation) => void;
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
  onDuplicate,
}, ref) => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] =
    useState(DEFAULT_EXCHANGE_RATE);

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

  async function updateQuotationStatus(
    quotation: Quotation,
    status: string
  ) {
    if (status === quotation.status) {
      return;
    }

    const confirmed = window.confirm(
      `Cambiar estado de ${quotation.quotationNumber} a ${status}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/cotizaciones/${quotation.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "No se pudo cambiar el estado."
        );
      }

      setQuotations((currentQuotations) =>
        currentQuotations.map((currentQuotation) =>
          currentQuotation.id === quotation.id
            ? {
                ...currentQuotation,
                status: result.status,
              }
            : currentQuotation
        )
      );

      alert("Estado actualizado correctamente.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrio un error al cambiar el estado."
      );
    }
  }

  useImperativeHandle(ref, () => ({
    reload: loadQuotations,
  }));

  useEffect(() => {
    async function loadInitialData() {
      try {
        const response = await fetch("/api/configuracion", {
          cache: "no-store",
        });

        if (response.ok) {
          const settings = await response.json();

          if (typeof settings?.exchangeRate === "number") {
            setExchangeRate(settings.exchangeRate);
          }
        }
      } catch (error) {
        console.error(error);
      }

      await loadQuotations();
    }

    void loadInitialData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center text-white">
        Cargando cotizaciones...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900">
      <div className="flex items-center justify-between border-b border-neutral-800 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Cotizaciones
        </h2>

        <span className="rounded-full bg-yellow-600 px-3 py-1 text-sm font-bold text-white sm:px-4 sm:py-2">
          {quotations.length}
        </span>
      </div>

      <div className="space-y-3 p-3 md:hidden">
        {quotations.map((quotation) => (
          <div
            key={quotation.id}
            className="rounded-xl border border-neutral-800 bg-black p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-white">{quotation.quotationNumber}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  {quotation.customer.customerName}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={quotation.status} />
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `/admin/cotizaciones/${quotation.id}`;
                  }}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
                >
                  Ver
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-neutral-500">Cliente</p>
                <p className="text-white">{quotation.customer.company || "-"}</p>
              </div>
              <div>
                <p className="text-neutral-500">Total</p>
                <p className="text-white">
                  {formatExchangeCurrency(
                    quotation.total,
                    quotation.currency,
                    exchangeRate
                  )}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-neutral-500">Estado</p>
                <select
                  value={quotation.status}
                  onChange={(event) => {
                    void updateQuotationStatus(quotation, event.target.value);
                  }}
                  className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm font-bold text-white outline-none focus:border-yellow-500"
                >
                  {QUOTATION_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <p className="text-neutral-500">Fecha</p>
                <p className="text-neutral-300">
                  {new Date(quotation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <QuotationActions
                onView={() => {
                  window.location.href = `/admin/cotizaciones/${quotation.id}`;
                }}
                onEdit={() => onEdit(quotation)}
                onDuplicate={() => onDuplicate(quotation)}
                onDelete={() => {
                  void deleteQuotation(quotation);
                }}
              />
            </div>
          </div>
        ))}

        {quotations.length === 0 && (
          <div className="p-6 text-center text-sm text-neutral-400">
            No hay cotizaciones registradas.
          </div>
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="bg-neutral-950">
            <tr>
              <th className="p-4 text-left text-yellow-500">Numero</th>
              <th className="p-4 text-left text-yellow-500">Cliente</th>
              <th className="p-4 text-left text-yellow-500">Estado</th>
              <th className="p-4 text-left text-yellow-500">Total</th>
              <th className="p-4 text-left text-yellow-500">Fecha</th>
              <th className="p-4 text-center text-yellow-500">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {quotations.map((quotation) => (
              <tr
                key={quotation.id}
                className="border-t border-neutral-800 hover:bg-neutral-800/40"
              >
                <td className="p-4 font-bold text-white">{quotation.quotationNumber}</td>

                <td className="p-4">
                  <div className="font-semibold text-white">
                    {quotation.customer.customerName}
                  </div>
                  <div className="text-sm text-neutral-400">
                    {quotation.customer.company || "-"}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    <StatusBadge status={quotation.status} />
                    <select
                      value={quotation.status}
                      onChange={(event) => {
                        void updateQuotationStatus(quotation, event.target.value);
                      }}
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm font-bold text-white outline-none focus:border-yellow-500"
                    >
                      {QUOTATION_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                <td className="p-4 text-white">
                  {formatExchangeCurrency(
                    quotation.total,
                    quotation.currency,
                    exchangeRate
                  )}
                </td>

                <td className="p-4 text-neutral-300">
                  {new Date(quotation.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <QuotationActions
                    onView={() => {
                      window.location.href = `/admin/cotizaciones/${quotation.id}`;
                    }}
                    onEdit={() => onEdit(quotation)}
                    onDuplicate={() => onDuplicate(quotation)}
                    onDelete={() => {
                      void deleteQuotation(quotation);
                    }}
                  />
                </td>
              </tr>
            ))}

            {quotations.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-400">
                  No hay cotizaciones registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

QuotationTable.displayName = "QuotationTable";

export default QuotationTable;
