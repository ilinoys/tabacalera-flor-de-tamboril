import { prisma } from "@/lib/prisma";
import { getProductById } from "@/lib/products";

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

  return prisma.$transaction(async (tx) => {
    await Promise.all(
      data.items.map(async (item) => {
        const catalogProduct = getProductById(item.productId);

        if (!catalogProduct) {
          throw new Error(`Producto invalido: ${item.productId}`);
        }

        await tx.product.upsert({
          where: {
            id: catalogProduct.id,
          },
          update: {
            name: catalogProduct.name,
            description: catalogProduct.description,
            price: catalogProduct.price,
            stock: catalogProduct.stock,
            image: catalogProduct.image,
            category: catalogProduct.category,
            strength: catalogProduct.strength,
            origin: catalogProduct.origin,
            size: catalogProduct.size,
            featured: catalogProduct.featured,
          },
          create: catalogProduct,
        });
      })
    );

    return tx.order.create({
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
