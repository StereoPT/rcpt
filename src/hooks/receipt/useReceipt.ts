import { getReceiptOptions } from "@/lib/queryOptions/receipt";
import { useQuery } from "@tanstack/react-query";

export const useReceipt = (id: string) => {
  return useQuery(getReceiptOptions(id));
};
