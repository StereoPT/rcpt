"use client";

import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/constants/routes";
import { useReceipt } from "@/hooks/receipt/useReceipt";
import { formatCurrency } from "@/lib/formatter";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ReceiptDetailProps = {
  id: string;
};

export const ReceiptDetail = ({ id }: ReceiptDetailProps) => {
  const { data: receipt, isPending } = useReceipt(id);

  if (isPending || !receipt) return <LoadingState />;

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          aria-label="Back to Receipts"
          nativeButton={false}
          render={<Link href={ROUTES.receipts} />}
          size="icon"
          variant="outline"
        >
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            {receipt.store}
          </h1>
          <p className="text-muted-foreground">
            {format(receipt.date, "PPP")} · {formatCurrency(receipt.total)}
          </p>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Net amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipt.lineItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(item.netAmount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
