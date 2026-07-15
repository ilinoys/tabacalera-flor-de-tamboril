"use client";

import { useEffect, useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

import StatsGrid from "@/components/admin/dashboard/StatsGrid";
import StatusSummary from "@/components/admin/dashboard/StatusSummary";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  ordersToday: number;
  ordersThisMonth: number;

  statusSummary: {
    status: string;
    _count: number;
  }[];

  latestOrders: {
    id: string;
    customerName: string;
    status: string;
    createdAt: string;
  }[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const response = await fetch("/api/dashboard", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar el dashboard.");
        }

        const data = await response.json();

        if (!cancelled) {
          setStats(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="space-y-10 p-10">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-neutral-400">
              Resumen general del sistema.
            </p>
          </div>

          <StatsGrid
            loading={loading}
            stats={stats}
          />

          <StatusSummary
            loading={loading}
            data={stats?.statusSummary ?? []}
          />

          <RecentOrders
            loading={loading}
            orders={stats?.latestOrders ?? []}
          />
        </div>
      </div>
    </main>
  );
}
