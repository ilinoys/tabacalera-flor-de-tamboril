import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getSettings() {
  return prisma.companySettings.findFirst();
}

export async function saveSettings(
  data: Prisma.CompanySettingsUncheckedCreateInput
) {
  const current = await prisma.companySettings.findFirst();

  if (current) {
    return prisma.companySettings.update({
      where: {
        id: current.id,
      },
      data,
    });
  }

  return prisma.companySettings.create({
    data,
  });
}