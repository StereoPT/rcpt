const currencyFormatter = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};
