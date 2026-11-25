"use server";

import { prisma } from "@/lib/prisma";
import { type EditReceiptInput, editReceiptSchema } from "@/schemas/receipt";

export const UpdateReceipt = async (
  receiptId: string,
  input: EditReceiptInput,
) => {
  const { data, success } = await editReceiptSchema.safeParseAsync(input);

  if (!success) {
    throw new Error("Invalid form data");
  }

  await prisma.receipt.update({
    where: { id: receiptId },
    data,
  });

  return { success: true };
};
