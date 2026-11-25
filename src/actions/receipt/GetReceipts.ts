"use server";

import { prisma } from "@/lib/prisma";

export const GetReceipts = async () => {
  return prisma.receipt.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
};
