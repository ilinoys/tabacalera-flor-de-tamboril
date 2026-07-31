"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import UsersAdmin from "@/components/admin/users/UsersAdmin";

export default function UsuariosPage() {
  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-10">
          <UsersAdmin />
        </div>
      </div>
    </main>
  );
}
