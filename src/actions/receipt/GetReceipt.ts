"use server";

import { prisma } from "@/lib/prisma";

export const GetReceipt = async (id: string) => {
  return prisma.receipt.findUnique({
    where: { id },
    include: { lineItems: { orderBy: { id: "asc" } } },
  });
};
