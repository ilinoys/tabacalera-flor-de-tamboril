"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import QuoteForm from "@/components/admin/quotes/QuoteForm";

export default function NewQuotePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1">
        <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="space-y-8 p-10">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Nueva Cotización
            </h1>

            <p className="mt-2 text-neutral-400">
              Crea una cotización profesional para tus clientes.
            </p>
          </div>

          <QuoteForm />
        </div>
      </div>
    </main>
  );
}