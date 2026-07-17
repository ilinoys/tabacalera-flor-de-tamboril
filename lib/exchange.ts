import {
  formatCurrency,
  getCurrencySymbol,
} from "@/lib/currency";

export const DEFAULT_EXCHANGE_RATE = 61.5;

export function normalizeExchangeRate(
  exchangeRate?: number | null
) {
  if (!exchangeRate || exchangeRate <= 0) {
    return DEFAULT_EXCHANGE_RATE;
  }

  return exchangeRate;
}

export function convertFromUsd(
  value: number,
  currency?: string | null,
  exchangeRate?: number | null
) {
  if (currency === "DOP") {
    return value * normalizeExchangeRate(exchangeRate);
  }

  return value;
}

export function convertToUsd(
  value: number,
  currency?: string | null,
  exchangeRate?: number | null
) {
  if (currency === "DOP") {
    return value / normalizeExchangeRate(exchangeRate);
  }

  return value;
}

export function formatExchangeCurrency(
  valueInUsd: number,
  currency?: string | null,
  exchangeRate?: number | null
) {
  return formatCurrency(
    convertFromUsd(valueInUsd, currency, exchangeRate),
    currency
  );
}

export function getExchangeCurrencySymbol(
  currency?: string | null
) {
  return getCurrencySymbol(currency);
}
