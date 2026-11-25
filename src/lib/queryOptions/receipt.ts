import { GetReceipt } from "@/actions/receipt/GetReceipt";
import { GetReceipts } from "@/actions/receipt/GetReceipts";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getReceiptsOptions = () => {
  return queryOptions({
    queryKey: KEYS.receipts,
    queryFn: () => GetReceipts(),
    throwOnError: true,
  });
};

export const getReceiptOptions = (id: string) => {
  return queryOptions({
    queryKey: KEYS.receipt(id),
    queryFn: () => GetReceipt(id),
    throwOnError: true,
  });
};
