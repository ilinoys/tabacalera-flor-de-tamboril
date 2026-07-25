import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const [
    totalProducts,
    totalOrders,
    pendingOrders,
    ordersToday,
    ordersThisMonth,
    latestOrders,
    statusSummary,
    topProducts,
  ] = await Promise.all([
    prisma.product.count(),

    prisma.order.count(),

    prisma.order.count({
      where: {
        status: "PENDIENTE",
      },
    }),

    prisma.order.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    }),

    prisma.order.count({
      where: {
        createdAt: {
          gte: firstDayOfMonth,
        },
      },
    }),

    prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.order.groupBy({
      by: ["status"],
      _count: true,
    }),

    prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    }),
  ]);

  const products = await Promise.all(
    topProducts.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      return {
        id: item.productId,
        name: product?.name ?? "Producto eliminado",
        quantity: item._sum.quantity ?? 0,
      };
    })
  );

  return {
    totalProducts,
    totalOrders,
    pendingOrders,
    ordersToday,
    ordersThisMonth,
    latestOrders,
    statusSummary,
    topProducts: products,
  };
}