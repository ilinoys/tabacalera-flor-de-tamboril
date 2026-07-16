export function getCurrencySymbol(currency?: string | null) {
  return currency === "DOP" ? "RD$" : "US$";
}

export function formatCurrency(
  value: number,
  currency?: string | null
) {
  return `${getCurrencySymbol(currency)} ${value.toFixed(2)}`;
}
