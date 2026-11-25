const RECEIPTS = "receipts";

export const KEYS = {
  receipts: [RECEIPTS],
  receipt: (receiptId: string) => [RECEIPTS, receiptId],
};
