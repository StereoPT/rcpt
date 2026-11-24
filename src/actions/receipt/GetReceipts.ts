"use server";

import type { Receipt } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type ReceiptListItem = Pick<Receipt, "id" | "store" | "date"> & {
  total: number;
  lineItemCount: number;
};

export const GetReceipts = async (): Promise<ReceiptListItem[]> => {
  const receipts = await prisma.receipt.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    include: { _count: { select: { lineItems: true } } },
  });

  return receipts.map((receipt) => ({
    id: receipt.id,
    store: receipt.store,
    date: receipt.date,
    total: receipt.total.toNumber(),
    lineItemCount: receipt._count.lineItems,
  }));
};
