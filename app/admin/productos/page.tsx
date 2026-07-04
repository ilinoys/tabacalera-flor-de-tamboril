import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductTable from "@/components/admin/products/ProductTable";
import ProductToolbar from "@/components/admin/products/ProductToolbar";

export default function ProductosPage() {
  return (
    <main className="flex min-h-screen bg-black">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <div className="p-10">

          <div className="mb-8 flex items-center justify-between">

            <h1 className="text-4xl font-bold text-white">
              Productos
            </h1>

            <button className="rounded-lg bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500">
              Nuevo Producto
            </button>

          </div>

          <ProductToolbar />

<ProductTable />

        </div>

      </div>

    </main>
  );
}