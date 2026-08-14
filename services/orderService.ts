import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

interface CreateOrderData {
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
}

export async function createOrder(data: CreateOrderData) {
  if (!data.items || data.items.length === 0) {
    throw new Error("El pedido no contiene productos.");
  }

  return prisma.order.create({
    data: {
      customerName: data.customerName,
      company: data.company || null,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      customerType: data.customerType,
      notes: data.notes || null,

      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
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

export async function createOrderFromQuotation(
  quotationId: string
) {
  const quotation = await prisma.quotation.findUnique({
    where: {
      id: quotationId,
    },

    include: {
      customer: true,

      items: true,
    },
  });

  if (!quotation) {
    throw new Error("La cotización no existe.");
  }

  const order = await prisma.order.create({
    data: {
      customerId: quotation.customer.id,

      customerName: quotation.customer.customerName,
      company: quotation.customer.company,
      email: quotation.customer.email,
      phone: quotation.customer.phone,
      country: quotation.customer.country,
      city: quotation.customer.city,
      customerType: quotation.customer.customerType,

      notes: quotation.notes,

      status: OrderStatus.PENDIENTE,

      items: {
        create: quotation.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },

    include: {
      customer: true,

      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
}

export async function getOrders() {
  return prisma.order.findMany({
    include: {
      customer: true,

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
  return prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      customer: true,

      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
) {
  return prisma.order.update({
    where: {
      id,
    },

    data: {
      status,
    },
  });
}

export async function deleteOrder(id: string) {
  return prisma.order.delete({
    where: {
      id,
    },
  });
}