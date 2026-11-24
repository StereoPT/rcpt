"use client";

import type { ReceiptListItem } from "@/actions/receipt/GetReceipts";
import { formatDate } from "@/lib/date";
import { formatCurrency } from "@/lib/formatter";
import type { ColumnDef } from "@tanstack/react-table";

export const receiptColumns: ColumnDef<ReceiptListItem>[] = [
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.date),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => formatCurrency(row.original.total),
  },
  {
    accessorKey: "lineItemCount",
    header: "Line Items",
  },
];
