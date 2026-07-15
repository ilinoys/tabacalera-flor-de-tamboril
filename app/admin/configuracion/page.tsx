"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

import SettingsForm from "@/components/admin/settings/SettingsForm";

export default function ConfiguracionPage() {
  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-10">
          <SettingsForm />
        </div>
      </div>
    </main>
  );
}