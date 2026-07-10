import {
  ClipboardList,
  Clock3,
  Package,
  CalendarDays,
} from "lucide-react";

import DashboardCard from "../DashboardCard";

interface Props {
  loading: boolean;
  stats: {
    totalProducts: number;
    totalOrders: number;
    pendingOrders: number;
    ordersToday: number;
  } | null;
}

export default function StatsGrid({
  loading,
  stats,
}: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

      <DashboardCard
        title="Productos"
        value={loading ? "..." : stats?.totalProducts ?? 0}
        description="Productos registrados"
        icon={<Package size={32} />}
      />

      <DashboardCard
        title="Pedidos"
        value={loading ? "..." : stats?.totalOrders ?? 0}
        description="Solicitudes recibidas"
        icon={<ClipboardList size={32} />}
      />

      <DashboardCard
        title="Pendientes"
        value={loading ? "..." : stats?.pendingOrders ?? 0}
        description="Requieren atención"
        icon={<Clock3 size={32} />}
      />

      <DashboardCard
        title="Hoy"
        value={loading ? "..." : stats?.ordersToday ?? 0}
        description="Pedidos recibidos hoy"
        icon={<CalendarDays size={32} />}
      />

    </div>
  );
}