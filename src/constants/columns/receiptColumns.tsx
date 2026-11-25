"use client";

import { ReceiptActions } from "@/components/receipts/ReceiptActions";
import { ROUTES } from "@/constants/routes";
import type { Receipt } from "@/generated/prisma/client";
import { formatCurrency } from "@/lib/formatter";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

export const receiptColumns: ColumnDef<Receipt>[] = [
  {
    accessorKey: "store",
    header: "Store",
    size: 360,
    cell: ({ row }) => (
      <Link
        className="font-medium hover:underline"
        href={ROUTES.receipt(row.original.id)}
      >
        {row.original.store}
      </Link>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 160,
    cell: ({ row }) => format(row.original.date, "PPP"),
  },
  {
    accessorKey: "total",
    header: "Total",
    size: 100,
    cell: ({ row }) => (
      <span className="tabular-nums">{formatCurrency(row.original.total)}</span>
    ),
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => <ReceiptActions receipt={row.original} />,
  },
];
