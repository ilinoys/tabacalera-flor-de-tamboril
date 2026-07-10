import { prisma } from "@/lib/prisma";

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

export async function getOrders() {
  return prisma.order.findMany({
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
  return prisma.order.findUnique({
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

export async function updateOrderStatus(
  id: string,
  status:
    | "PENDIENTE"
    | "EN_REVISION"
    | "COTIZADO"
    | "CONFIRMADO"
    | "ENVIADO"
    | "ENTREGADO"
    | "CANCELADO"
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