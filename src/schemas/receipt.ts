import { z } from "zod";

export const editReceiptSchema = z.object({
  store: z.string().trim().min(1, "Store is required"),
  date: z.date("Date is required"),
  total: z.number("Total is required").min(0, "Total cannot be negative"),
});

export type EditReceiptInput = z.infer<typeof editReceiptSchema>;

export const lineItemSchema = z.object({
  description: z.string().trim().min(1, "Description is required"),
  quantity: z.number("Quantity is required").gt(0, "Quantity must be positive"),
  netAmount: z.number("Net amount is required"),
});

export type LineItemInput = z.infer<typeof lineItemSchema>;

export const createReceiptSchema = editReceiptSchema.extend({
  lineItems: z.array(lineItemSchema).min(1, "Add at least one Line Item"),
});

export type CreateReceiptInput = z.infer<typeof createReceiptSchema>;
