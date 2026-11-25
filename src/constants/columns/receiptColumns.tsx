"use client";

import { ReceiptActions } from "@/components/receipts/ReceiptActions";
import type { Receipt } from "@/generated/prisma/client";
import { formatDate } from "@/lib/date";
import { formatCurrency } from "@/lib/formatter";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const receiptColumns: ColumnDef<Receipt>[] = [
  {
    accessorKey: "store",
    header: "Store",
    cell: ({ row }) => (
      <Link
        className="font-medium hover:underline"
        href={`/receipts/${row.original.id}`}
      >
        {row.original.store}
      </Link>
    ),
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
    id: "actions",
    cell: ({ row }) => <ReceiptActions receipt={row.original} />,
  },
];
