"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar
  isOpen={isSidebarOpen}
  setIsOpen={setIsSidebarOpen}
/>

      <div className="flex-1">
        <AdminHeader
  setIsSidebarOpen={setIsSidebarOpen}
/>

        {children}
      </div>
    </main>
  );
}