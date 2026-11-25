import { ImportReceipt } from "@/components/receipts/ImportReceipt";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ImportReceiptProvider } from "@/providers/ImportReceiptProvider";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Import Receipt" };

const ReceiptsImportPage = () => {
  return (
    <ImportReceiptProvider>
      <main className="mx-auto max-w-3xl space-y-6 p-6">
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
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Import Receipt
          </h1>
        </div>
        <ImportReceipt />
      </main>
    </ImportReceiptProvider>
  );
};

export default ReceiptsImportPage;
