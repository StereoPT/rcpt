"use client";

import { DeleteDialog } from "@/components/DeleteDialog";
import { EditReceiptDialog } from "@/components/receipts/EditReceiptDialog";
import { Button } from "@/components/ui/button";
import type { Receipt } from "@/generated/prisma/client";
import { useDeleteReceipt } from "@/hooks/receipt/useDeleteReceipt";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type ReceiptActionsProps = {
  receipt: Receipt;
};

export const ReceiptActions = ({ receipt }: ReceiptActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { isPending, mutateAsync } = useDeleteReceipt(receipt.id);

  return (
    <>
      {showDeleteAlert && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete the <b>{receipt.store}</b> Receipt
              and all of its Line Items. This action cannot be undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
        />
      )}

      {showEditDialog && (
        <EditReceiptDialog
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
          receipt={receipt}
        />
      )}

      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100">
        <Button
          aria-label={`Edit ${receipt.store} Receipt`}
          onClick={() => setShowEditDialog(true)}
          size="icon-sm"
          variant="ghost"
        >
          <Pencil />
        </Button>
        <Button
          aria-label={`Delete ${receipt.store} Receipt`}
          onClick={() => setShowDeleteAlert(true)}
          size="icon-sm"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>
    </>
  );
};
