export const ROUTES = {
  home: "/",
  receipts: "/receipts",
  receipt: (receiptId: string) => `/receipts/${receiptId}`,
  receiptsImport: "/receipts/import",
} as const;
