"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  FileDown,
  Printer,
  Mail,
  MessageCircle,
  RefreshCw,
} from "lucide-react";

import { formatCurrency } from "@/lib/currency";

interface Props {
  quotationId: string;
  quotationNumber: string;
  customerName: string;
  total: number;
  currency: string;
}

export default function QuotationToolbar({
  quotationId,
  quotationNumber,
  customerName,
  total,
  currency,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  function downloadPdf() {
    window.open(
      `/api/cotizaciones/${quotationId}/pdf`,
      "_blank"
    );
  }

  function printQuotation() {
    window.print();
  }

  function sendWhatsApp() {
    const pdfUrl = new URL(
      `/api/cotizaciones/${quotationId}/pdf`,
      window.location.origin
    ).toString();

    const message = [
      `Hola ${customerName},`,
      "",
      `Te compartimos la cotizacion ${quotationNumber}.`,
      `Total: ${formatCurrency(total, currency)}`,
      `PDF: ${pdfUrl}`,
    ].join("\n");

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function sendEmail() {
    try {
      const response = await fetch(
        `/api/cotizaciones/${quotationId}/email`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "No se pudo preparar el correo."
        );
      }

      if (result.mailtoUrl) {
        window.location.href = result.mailtoUrl;
        return;
      }

      alert("Correo enviado correctamente.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrio un error al preparar el correo."
      );
    }
  }

  async function convertToOrder() {
    const confirmed = window.confirm(
      "¿Deseas convertir esta cotización en un pedido?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(
        `/api/cotizaciones/${quotationId}/convertir`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "No se pudo convertir la cotización."
        );
      }

      alert("✅ Pedido creado correctamente.");

      router.push(`/admin/pedidos/${result.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrió un error."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sticky top-0 z-40 mb-8 rounded-2xl border border-neutral-800 bg-neutral-900/95 p-4 backdrop-blur">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <Link
          href="/admin/cotizaciones"
          className="flex items-center gap-2 rounded-xl bg-neutral-800 px-5 py-3 text-white hover:bg-neutral-700"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={downloadPdf}
            className="flex items-center gap-2 rounded-xl bg-yellow-600 px-5 py-3 font-bold text-white hover:bg-yellow-500"
          >
            <FileDown size={18} />
            Descargar PDF
          </button>

          <button
            onClick={printQuotation}
            className="flex items-center gap-2 rounded-xl bg-neutral-800 px-5 py-3 text-white hover:bg-neutral-700"
          >
            <Printer size={18} />
            Imprimir
          </button>

          <button
            onClick={sendWhatsApp}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-500"
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>

          <button
            onClick={() => {
              void sendEmail();
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500"
          >
            <Mail size={18} />
            Correo
          </button>

          <button
            onClick={convertToOrder}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-bold text-white hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />

            {loading
              ? "Convirtiendo..."
              : "Convertir en Pedido"}
          </button>

        </div>

      </div>

    </div>
  );
}
