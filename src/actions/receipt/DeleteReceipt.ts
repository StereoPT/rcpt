"use server";

import { prisma } from "@/lib/prisma";

export const DeleteReceipt = async (receiptId: string) => {
  await prisma.receipt.delete({ where: { id: receiptId } });
};
