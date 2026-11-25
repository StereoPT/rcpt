"use client";

import { LoadingState } from "@/components/LoadingState";
import { useReceipts } from "@/hooks/receipt/useReceipts";
import { DataTable } from "@stereopt/data-table";
import { receiptColumns } from "@/constants/columns/receiptColumns";

export const ReceiptsTable = () => {
  const { data, isPending } = useReceipts();

  if (isPending || !data) return <LoadingState />;

  return <DataTable columns={receiptColumns} data={data} />;
};
