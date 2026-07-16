"use client";

import { useMemo, useState } from "react";

import CustomerSelector from "./CustomerSelector";
import ProductSelector from "./ProductSelector";
import QuotationItems from "./QuotationItems";
import QuotationOptions from "./QuotationOptions";
import TotalsCard from "./TotalsCard";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Item {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Quotation {
  id: string;
  customerId: string;
  discount: number;
  notes?: string | null;
  validUntil?: string | null;
  currency: string;
  paymentTerms?: string | null;
  deliveryTime?: string | null;
  incoterm?: string | null;
  salesperson?: string | null;
  items: {
    productId: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
}

interface Props {
  open: boolean;
  quotation?: Quotation | null;
  mode?: "create" | "edit" | "duplicate";
  onClose: () => void;
}

function formatDateInput(value?: string | null) {
  if (!value) return "";

  return new Date(value).toISOString().slice(0, 10);
}

function getInitialItems(quotation?: Quotation | null): Item[] {
  return (
    quotation?.items.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
    })) ?? []
  );
}

export default function QuotationModal({
  open,
  quotation,
  mode = "create",
  onClose,
}: Props) {
  const editing = mode === "edit" && !!quotation;

  const [customerId, setCustomerId] = useState(
    quotation?.customerId ?? ""
  );

  const [items, setItems] = useState<Item[]>(() =>
    getInitialItems(quotation)
  );

  const [discount, setDiscount] = useState(
    quotation?.discount ?? 0
  );

  const [notes] = useState(quotation?.notes ?? "");

  const [validUntil, setValidUntil] = useState(
    formatDateInput(quotation?.validUntil)
  );

  const [currency, setCurrency] = useState(
    quotation?.currency ?? "USD"
  );

  const [paymentTerms, setPaymentTerms] = useState(
    quotation?.paymentTerms ?? ""
  );

  const [deliveryTime, setDeliveryTime] = useState(
    quotation?.deliveryTime ?? ""
  );

  const [incoterm, setIncoterm] = useState(
    quotation?.incoterm ?? ""
  );

  const [salesperson, setSalesperson] = useState(
    quotation?.salesperson ?? ""
  );

  const [saving, setSaving] = useState(false);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [items]);

  function addProduct(product: Product) {
    const exists = items.find(
      (item) => item.productId === product.id
    );

    if (exists) {
      setItems((current) =>
        current.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

      return;
    }

    setItems((current) => [
      ...current,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    ]);
  }

  function updateQuantity(
    productId: string,
    quantity: number
  ) {
    if (quantity < 1) return;

    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  }

  function removeProduct(productId: string) {
    setItems((current) =>
      current.filter(
        (item) => item.productId !== productId
      )
    );
  }

  function resetForm() {
    setCustomerId("");
    setItems([]);
    setDiscount(0);
    setValidUntil("");
    setCurrency("USD");
    setPaymentTerms("");
    setDeliveryTime("");
    setIncoterm("");
    setSalesperson("");
  }

  async function saveQuotation() {
    if (!customerId) {
      alert("Debe seleccionar un cliente.");
      return;
    }

    if (items.length === 0) {
      alert("Debe agregar al menos un producto.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        editing
          ? `/api/cotizaciones/${quotation.id}`
          : "/api/cotizaciones",
        {
          method: editing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId,
            subtotal,
            discount,
            total: subtotal - discount,
            notes,
            validUntil: validUntil || null,
            currency,
            paymentTerms,
            deliveryTime,
            incoterm: incoterm || null,
            salesperson,
            items: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "No se pudo guardar la cotizacion."
        );
      }

      alert(
        editing
          ? "Cotizacion actualizada correctamente."
          : "Cotizacion creada correctamente."
      );

      resetForm();
      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrio un error."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="max-h-[95vh] w-full max-w-7xl overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            {editing
              ? "Editar Cotizacion"
              : "Nueva Cotizacion"}
          </h2>

          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500 disabled:opacity-50"
          >
            Cerrar
          </button>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            <CustomerSelector
              value={customerId}
              onChange={setCustomerId}
            />

            <ProductSelector
              onAdd={addProduct}
            />

            <QuotationOptions
              validUntil={validUntil}
              onValidUntilChange={setValidUntil}
              currency={currency}
              onCurrencyChange={setCurrency}
              paymentTerms={paymentTerms}
              onPaymentTermsChange={setPaymentTerms}
              deliveryTime={deliveryTime}
              onDeliveryTimeChange={setDeliveryTime}
              incoterm={incoterm}
              onIncotermChange={setIncoterm}
              salesperson={salesperson}
              onSalespersonChange={setSalesperson}
            />

            <QuotationItems
              items={items}
              onUpdateQuantity={updateQuantity}
              onRemove={removeProduct}
            />

          </div>

          <div>

            <TotalsCard
              subtotal={subtotal}
              discount={discount}
              onDiscountChange={setDiscount}
            />

            <button
              type="button"
              onClick={saveQuotation}
              disabled={saving}
              className="mt-6 w-full rounded-xl bg-yellow-600 py-4 font-bold text-white hover:bg-yellow-500 disabled:opacity-50"
            >
              {saving
                ? "Guardando..."
                : editing
                ? "Actualizar Cotizacion"
                : "Guardar Cotizacion"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
