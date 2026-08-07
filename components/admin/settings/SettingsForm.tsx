"use client";

import { useEffect, useState } from "react";

import CompanyCard from "./CompanyCard";
import CommercialCard from "./CommercialCard";
import ExchangeRateCard from "./ExchangeRateCard";
import ExportCard from "./ExportCard";
import PdfCard from "./PdfCard";
import WhatsappCard from "./WhatsappCard";
import MailCard from "./MailCard";
import PreferencesCard from "./PreferencesCard";

export interface Settings {
  companyName: string;
  slogan: string;
  rnc: string;

  address: string;
  city: string;
  country: string;

  phone: string;
  mobile: string;
  whatsapp: string;

  email: string;
  website: string;

  currency: string;
  exchangeRate: number;

  language: string;
  timezone: string;

  exportPort: string;
  destinationPort: string;
  exportCountry: string;

  primaryColor: string;
  secondaryColor: string;
  pdfFooter: string;

  senderName: string;
  senderEmail: string;

  whatsappMessage: string;

  showLogo: boolean;
  showSignature: boolean;
  showStamp: boolean;
}

export type SettingsValue = Settings[keyof Settings];

export type UpdateSettingsField = (
  field: keyof Settings,
  value: SettingsValue
) => void;

export default function SettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Settings>({
    companyName: "",
    slogan: "",
    rnc: "",

    address: "",
    city: "",
    country: "",

    phone: "",
    mobile: "",
    whatsapp: "",

    email: "",
    website: "",

    currency: "USD",
    exchangeRate: 61.5,

    language: "es",
    timezone: "America/Santo_Domingo",

    exportPort: "",
    destinationPort: "",
    exportCountry: "",

    primaryColor: "#D4AF37",
    secondaryColor: "#000000",
    pdfFooter: "",

    senderName: "",
    senderEmail: "",

    whatsappMessage: "",

    showLogo: true,
    showSignature: true,
    showStamp: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const response = await fetch("/api/configuracion");

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        if (data && !cancelled) {
          setForm((current) => ({
            ...current,
            ...data,
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  function update(field: keyof Settings, value: SettingsValue) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function save() {
    try {
      setSaving(true);

      const response = await fetch("/api/configuracion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "No se pudo guardar.");
      }

      alert("Configuración guardada correctamente.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ocurrió un error."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-10 text-center text-white">
        Cargando configuración...
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Configuración
        </h1>

        <p className="mt-2 text-sm text-neutral-400 sm:text-base">
          Administra la configuración general del ERP.
        </p>
      </div>

      <CompanyCard
        form={form}
        update={update}
      />

      <CommercialCard
        form={form}
        update={update}
      />

      <ExchangeRateCard
        form={form}
        update={update}
        saving={saving}
        onSave={save}
      />

      <ExportCard
        form={form}
        update={update}
      />

      <PdfCard
        form={form}
        update={update}
      />

      <WhatsappCard
        form={form}
        update={update}
      />

      <MailCard
        form={form}
        update={update}
      />

      <PreferencesCard
        form={form}
        update={update}
      />

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="w-full rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500 disabled:opacity-50 sm:w-auto sm:px-8 sm:py-4"
        >
          {saving ? "Guardando..." : "Guardar Configuración"}
        </button>
      </div>

    </div>
  );
}
