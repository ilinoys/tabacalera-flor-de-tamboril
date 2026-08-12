import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getSettings() {
  return prisma.companySettings.findFirst();
}

const settingsFields = [
  "companyName",
  "slogan",
  "rnc",
  "address",
  "city",
  "country",
  "phone",
  "mobile",
  "whatsapp",
  "email",
  "website",
  "currency",
  "exchangeRate",
  "language",
  "timezone",
  "exportPort",
  "destinationPort",
  "exportCountry",
  "primaryColor",
  "secondaryColor",
  "pdfFooter",
  "senderName",
  "senderEmail",
  "whatsappMessage",
  "showLogo",
  "showSignature",
  "showStamp",
] as const;

function normalizeSettings(
  data: Prisma.CompanySettingsUncheckedCreateInput
) {
  const settings: Prisma.CompanySettingsUncheckedCreateInput = {
    companyName: data.companyName,
    address: data.address,
    city: data.city,
    country: data.country,
    phone: data.phone,
    mobile: data.mobile,
    email: data.email,
  };

  for (const field of settingsFields) {
    if (field in data) {
      settings[field] = data[field] as never;
    }
  }

  return settings;
}

export async function saveSettings(
  data: Prisma.CompanySettingsUncheckedCreateInput
) {
  const current = await prisma.companySettings.findFirst();
  const settings = normalizeSettings(data);

  if (current) {
    return prisma.companySettings.update({
      where: {
        id: current.id,
      },
      data: settings,
    });
  }

  return prisma.companySettings.create({
    data: settings,
  });
}
