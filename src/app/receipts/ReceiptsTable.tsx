"use client";

import { useReceipts } from "@/hooks/receipt/useReceipts";
import { DataTable } from "@stereopt/data-table";
import { receiptColumns } from "@/constants/columns/receiptColumns";

export const ReceiptsTable = () => {
  const { data, isPending, isError } = useReceipts();

  if (isPending)
    return <p className="text-muted-foreground">Loading receipts…</p>;
  if (isError)
    return <p className="text-destructive">Could not load receipts.</p>;

  return <DataTable columns={receiptColumns} data={data} />;
};
