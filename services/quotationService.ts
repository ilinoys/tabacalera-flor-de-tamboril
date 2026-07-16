import { prisma } from "@/lib/prisma";
import {
  Currency,
  Incoterm,
  QuotationStatus,
} from "@prisma/client";

interface QuotationItemData {
  productId: string;
  quantity: number;
  price: number;
}

interface SaveQuotationData {
  customerId: string;

  subtotal: number;
  discount?: number;
  total: number;

  notes?: string;

  validUntil?: Date;

  currency?: Currency;

  paymentTerms?: string;

  deliveryTime?: string;

  incoterm?: Incoterm;

  salesperson?: string;

  items: QuotationItemData[];
}

function generateQuotationNumber() {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  const random = Math.floor(Math.random() * 9000 + 1000);

  return `COT-${year}${month}${day}-${random}`;
}

async function getDefaultCurrency() {
  const settings = await prisma.companySettings.findFirst({
    select: {
      currency: true,
    },
  });

  return settings?.currency ?? Currency.USD;
}

export async function createQuotation(
  data: SaveQuotationData
) {
  if (!data.items.length) {
    throw new Error(
      "Debe agregar al menos un producto."
    );
  }

  const currency = data.currency ?? await getDefaultCurrency();

  return prisma.quotation.create({
    data: {
      quotationNumber: generateQuotationNumber(),

      customerId: data.customerId,

      subtotal: Number(data.subtotal),

      discount: Number(data.discount || 0),

      total: Number(data.total),

      notes: data.notes || null,

      validUntil: data.validUntil ?? null,

      currency,

      paymentTerms: data.paymentTerms || null,

      deliveryTime: data.deliveryTime || null,

      incoterm: data.incoterm ?? null,

      salesperson: data.salesperson || null,

      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price),
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
}

export async function updateQuotation(
  id: string,
  data: SaveQuotationData
) {
  if (!data.items.length) {
    throw new Error(
      "Debe agregar al menos un producto."
    );
  }

  return prisma.$transaction(async (tx) => {
    await tx.quotationItem.deleteMany({
      where: {
        quotationId: id,
      },
    });

    return tx.quotation.update({
      where: {
        id,
      },

      data: {
        customerId: data.customerId,

        subtotal: Number(data.subtotal),

        discount: Number(data.discount || 0),

        total: Number(data.total),

        notes: data.notes || null,

        validUntil: data.validUntil ?? null,

        currency: data.currency ?? Currency.USD,

        paymentTerms: data.paymentTerms || null,

        deliveryTime: data.deliveryTime || null,

        incoterm: data.incoterm ?? null,

        salesperson: data.salesperson || null,

        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: Number(item.quantity),
            price: Number(item.price),
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
  });
}

export async function getQuotations() {
  return prisma.quotation.findMany({
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

export async function getQuotation(
  id: string
) {
  return prisma.quotation.findUnique({
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

export async function updateQuotationStatus(
  id: string,
  status: QuotationStatus
) {
  return prisma.quotation.update({
    where: {
      id,
    },

    data: {
      status,
    },
  });
}

export async function deleteQuotation(
  id: string
) {
  return prisma.quotation.delete({
    where: {
      id,
    },
  });
}
