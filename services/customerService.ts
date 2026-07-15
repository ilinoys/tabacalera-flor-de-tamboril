import { prisma } from "@/lib/prisma";
import { CustomerType } from "@prisma/client";

interface CustomerData {
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  customerType: CustomerType;
}

export async function getCustomers() {
  return prisma.customer.findMany({
    include: {
      orders: true,
      quotations: true,
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

      quotations: {
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
      quotations: true,
    },

    orderBy: {
      customerName: "asc",
    },
  });
}

export async function createCustomer(data: CustomerData) {
  return prisma.customer.create({
    data,
  });
}

export async function updateCustomer(
  id: string,
  data: CustomerData
) {
  return prisma.customer.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteCustomer(id: string) {
  return prisma.customer.delete({
    where: {
      id,
    },
  });
}

export async function getCustomerCount() {
  return prisma.customer.count();
}

export async function getCustomerStats() {
  const [
    total,
    particulares,
    distribuidores,
    mayoristas,
  ] = await Promise.all([
    prisma.customer.count(),

    prisma.customer.count({
      where: {
        customerType: "PARTICULAR",
      },
    }),

    prisma.customer.count({
      where: {
        customerType: "DISTRIBUIDOR",
      },
    }),

    prisma.customer.count({
      where: {
        customerType: "MAYORISTA",
      },
    }),
  ]);

  return {
    total,
    particulares,
    distribuidores,
    mayoristas,
  };
}