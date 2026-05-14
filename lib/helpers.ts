// Helper to format currency
export const formatPrice = (amount: number | string) => {
  if (amount == null) return "$0";
  const value = Number(amount);
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
};
