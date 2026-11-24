import { GetReceipts } from "@/actions/receipt/GetReceipts";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getReceiptsOptions = () => {
  return queryOptions({
    queryKey: KEYS.receipts,
    queryFn: () => GetReceipts(),
  });
};
