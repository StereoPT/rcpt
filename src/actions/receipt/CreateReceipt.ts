"use server";

import { prisma } from "@/lib/prisma";
import {
  type CreateReceiptInput,
  createReceiptSchema,
} from "@/schemas/receipt";

export const CreateReceipt = async (input: CreateReceiptInput) => {
  const { data, success } = await createReceiptSchema.safeParseAsync(input);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { lineItems, ...receipt } = data;

  return prisma.receipt.create({
    data: { ...receipt, lineItems: { create: lineItems } },
  });
};
