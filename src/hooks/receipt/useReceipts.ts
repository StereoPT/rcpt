import { getReceiptsOptions } from "@/lib/queryOptions/receipt";
import { useQuery } from "@tanstack/react-query";

export const useReceipts = () => {
  return useQuery(getReceiptsOptions());
};
