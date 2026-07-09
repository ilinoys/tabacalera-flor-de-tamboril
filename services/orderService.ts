import { prisma } from "@/lib/prisma";

export async function createOrder(data: {
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  customerType: "PARTICULAR" | "DISTRIBUIDOR" | "MAYORISTA";
  notes?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}) {
  return await prisma.order.create({
    data: {
      customerName: data.customerName,
      company: data.company,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      customerType: data.customerType,
      notes: data.notes,

      items: {
        create: data.items,
      },
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function getOrders() {
  return await prisma.order.findMany({
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
  });
}

export async function getOrder(id: string) {
  return await prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}