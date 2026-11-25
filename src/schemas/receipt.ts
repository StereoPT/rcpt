import { z } from "zod";

export const editReceiptSchema = z.object({
  store: z.string().trim().min(1, "Store is required"),
  date: z.date("Date is required"),
  total: z.number("Total is required").min(0, "Total cannot be negative"),
});

export type EditReceiptInput = z.infer<typeof editReceiptSchema>;
