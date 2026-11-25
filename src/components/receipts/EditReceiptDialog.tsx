"use client";

import { ReceiptFormFields } from "@/components/receipts/ReceiptFormFields";
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
import type { Receipt } from "@/generated/prisma/client";
import { useUpdateReceipt } from "@/hooks/receipt/useUpdateReceipt";
import { type EditReceiptInput, editReceiptSchema } from "@/schemas/receipt";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

type EditReceiptDialogProps = {
  receipt: Receipt;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const EditReceiptDialog = ({
  receipt,
  open,
  onOpenChange,
}: EditReceiptDialogProps) => {
  const formId = "edit-receipt";

  const form = useForm<EditReceiptInput>({
    resolver: zodResolver(editReceiptSchema),
    defaultValues: {
      store: receipt.store,
      date: receipt.date,
      total: receipt.total,
    },
  });

  const { mutateAsync, isPending } = useUpdateReceipt(receipt.id);

  const onSubmit = async (values: EditReceiptInput) => {
    await mutateAsync(values);
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-lg" finalFocus={false}>
        <DialogHeader>
          <DialogTitle>Edit Receipt</DialogTitle>
          <DialogDescription>
            Change the Store, date or total of this Receipt.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <ReceiptFormFields formId={formId} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Edit Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
