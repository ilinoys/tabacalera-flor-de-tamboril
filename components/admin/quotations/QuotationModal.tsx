"use client";

import { useMemo, useState } from "react";

import CustomerSelector from "./CustomerSelector";
import ProductSelector from "./ProductSelector";
import QuotationItems from "./QuotationItems";
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

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function QuotationModal({
  open,
  onClose,
}: Props) {
  const [customerId, setCustomerId] = useState("");

  const [items, setItems] = useState<Item[]>([]);

  const [discount, setDiscount] = useState(0);

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

      const response = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          subtotal,
          discount,
          total: subtotal - discount,
          notes: "",
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "No se pudo crear la cotización."
        );
      }

      alert("✅ Cotización creada correctamente.");

      setCustomerId("");
      setItems([]);
      setDiscount(0);

      onClose();

      // En el siguiente paso refrescaremos la tabla
      // automáticamente sin recargar la página.
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrió un error."
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
            Nueva Cotización
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
                : "Guardar Cotización"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}