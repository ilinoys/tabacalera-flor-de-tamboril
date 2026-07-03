import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardCard from "@/components/admin/DashboardCard";

export default function AdminPage() {
  return (
    <main className="flex min-h-screen bg-black">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <div className="p-10">

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            <DashboardCard
              title="Productos"
              value="24"
            />

            <DashboardCard
              title="Pedidos"
              value="12"
            />

            <DashboardCard
              title="Clientes"
              value="58"
            />

            <DashboardCard
              title="Ventas"
              value="US$4,250"
            />

          </div>

        </div>

      </div>

    </main>
  );
}