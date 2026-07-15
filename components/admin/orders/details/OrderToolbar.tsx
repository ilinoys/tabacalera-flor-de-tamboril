"use client";

import Link from "next/link";

import {
  ArrowLeft,
  FileDown,
  Printer,
  Mail,
  MessageCircle,
} from "lucide-react";

interface Props {
  orderId: string;
}

export default function OrderToolbar({
  orderId,
}: Props) {
  function printOrder() {
    window.print();
  }

  function downloadPdf() {
    window.open(
      `/api/pedidos/${orderId}/pdf`,
      "_blank"
    );
  }

  return (
    <div className="sticky top-0 z-40 mb-8 rounded-2xl border border-neutral-800 bg-neutral-900/95 p-4 backdrop-blur">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <Link
          href="/admin/pedidos"
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
            onClick={printOrder}
            className="flex items-center gap-2 rounded-xl bg-neutral-800 px-5 py-3 text-white hover:bg-neutral-700"
          >
            <Printer size={18} />
            Imprimir
          </button>

          <button
            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-500"
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>

          <button
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500"
          >
            <Mail size={18} />
            Correo
          </button>

        </div>

      </div>

    </div>
  );
}
