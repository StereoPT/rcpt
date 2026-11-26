"use client";

import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { receiptColumns } from "@/constants/columns/receiptColumns";
import { ROUTES } from "@/constants/routes";
import { useReceipts } from "@/hooks/receipt/useReceipts";
import { DataTable } from "@stereopt/data-table";
import { ReceiptText, Upload } from "lucide-react";
import Link from "next/link";

export const ReceiptsTable = () => {
  const { data, isPending } = useReceipts();

  if (isPending || !data) return <LoadingState />;

  if (data.length === 0) {
    return (
      <EmptyState
        action={
          <Button
            nativeButton={false}
            render={<Link href={ROUTES.receiptsImport} />}
          >
            <Upload /> Import
          </Button>
        }
        description="Import a Receipt PDF to start tracking your grocery spending."
        icon={<ReceiptText />}
        title="No Receipts yet"
      />
    );
  }

  return <DataTable columns={receiptColumns} data={data} />;
};
