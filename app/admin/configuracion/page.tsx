"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

import SectionTitle from "@/components/admin/settings/SectionTitle";
import CompanyCard from "@/components/admin/settings/CompanyCard";
import SaveBar from "@/components/admin/settings/SaveBar";

export default function ConfiguracionPage() {
  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-10">

          <SectionTitle
            title="Configuración"
            subtitle="Administra la información general del ERP Flor de Tamboril. Los datos configurados aquí serán utilizados automáticamente por los diferentes módulos del sistema."
          />

          <CompanyCard />

          <SaveBar />

        </div>
      </div>
    </main>
  );
}