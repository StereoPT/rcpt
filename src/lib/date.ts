const dateFormatter = new Intl.DateTimeFormat("pt-PT", { timeZone: "UTC" });

export const formatDate = (value: Date) => {
  return dateFormatter.format(value);
};
