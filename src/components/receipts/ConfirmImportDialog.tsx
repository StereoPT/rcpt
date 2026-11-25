"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { ROUTES } from "@/constants/routes";
import { useCreateReceipt } from "@/hooks/receipt/useCreateReceipt";
import { formatCurrency } from "@/lib/formatter";
import type { CreateReceiptInput } from "@/schemas/receipt";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type ConfirmImportDialogProps = {
  receipt: CreateReceiptInput;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ConfirmImportDialog = ({
  receipt,
  open,
  onOpenChange,
}: ConfirmImportDialogProps) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateReceipt();

  const handleConfirm = async () => {
    try {
      await mutateAsync(receipt);
      onOpenChange(false);
      router.push(ROUTES.receipts);
    } catch {
      onOpenChange(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Receipt</DialogTitle>
          <DialogDescription>
            Review the details below before importing.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Store</p>
            <p className="mt-1 truncate font-semibold">{receipt.store}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="mt-1 font-semibold">{format(receipt.date, "PP")}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="mt-1 font-semibold tabular-nums">
              {formatCurrency(receipt.total)}
            </p>
          </div>
          <div className="col-span-3 rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Line Items</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {receipt.lineItems.length}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            disabled={isPending}
            render={<Button variant="outline" />}
          >
            Cancel
          </DialogClose>
          <Button disabled={isPending} onClick={handleConfirm}>
            {isPending && <Spinner />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
