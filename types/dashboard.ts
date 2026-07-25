import { Order } from "./order";

export interface StatusSummary {
  status: string;
  _count: number;
}

export interface TopProduct {
  id: string;
  name: string;
  quantity: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;

  ordersToday: number;
  ordersThisMonth: number;

  latestOrders: Order[];

  statusSummary: StatusSummary[];

  topProducts: TopProduct[];
}