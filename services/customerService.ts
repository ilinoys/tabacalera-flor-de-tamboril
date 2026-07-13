import { prisma } from "@/lib/prisma";

export async function getCustomers() {
  return prisma.customer.findMany({
    include: {
      orders: true,
    },
    orderBy: {
      customerName: "asc",
    },
  });
}

export async function getCustomer(id: string) {
  return prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function searchCustomers(search: string) {
  return prisma.customer.findMany({
    where: {
      OR: [
        {
          customerName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          company: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          country: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      orders: true,
    },
    orderBy: {
      customerName: "asc",
    },
  });
}

export async function getCustomerCount() {
  return prisma.customer.count();
}