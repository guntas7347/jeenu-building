// Helper to format currency
export const formatPrice = (amount: number | string) => {
  if (amount == null) return "$0";
  const value = Number(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};
