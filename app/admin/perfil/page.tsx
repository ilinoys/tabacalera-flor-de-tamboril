"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProfileForm from "@/components/admin/profile/ProfileForm";

export default function PerfilPage() {
  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-10">
          <ProfileForm />
        </div>
      </div>
    </main>
  );
}
