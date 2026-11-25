"use client";

import { ConfirmImportDialog } from "@/components/receipts/ConfirmImportDialog";
import { ImportReviewForm } from "@/components/receipts/ImportReviewForm";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { toast } from "@/components/ui/toast";
import { useImportReceipt } from "@/hooks/receipt/useImportReceipt";
import { receiptDraftAtom } from "@/store/receiptDraftStore";
import type { CreateReceiptInput } from "@/schemas/receipt";
import { useAtom } from "jotai";
import { useState } from "react";

const MAX_SIZE = 5 * 1024 * 1024;

export const ImportReceipt = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [pending, setPending] = useState<CreateReceiptInput | null>(null);
  const [draft, setDraft] = useAtom(receiptDraftAtom);

  const { mutateAsync, isPending } = useImportReceipt();

  const handleDrop = async (dropped: File[]) => {
    const file = dropped[0];
    if (!file) return;

    setFiles(dropped);

    try {
      setDraft(await mutateAsync(file));
    } catch {
      setFiles(undefined);
    }
  };

  const handleReset = () => {
    setDraft(null);
    setFiles(undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <Dropzone
        accept={{ "application/pdf": [".pdf"] }}
        disabled={isPending}
        maxSize={MAX_SIZE}
        multiple={false}
        onDrop={handleDrop}
        onError={({ message }) =>
          toast.add({
            title: "Invalid file",
            description: message,
            type: "error",
          })
        }
        src={files}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>

      {draft && (
        <ImportReviewForm
          draft={draft}
          onBack={handleReset}
          onSubmit={setPending}
        />
      )}

      {pending && (
        <ConfirmImportDialog
          onOpenChange={(open) => !open && setPending(null)}
          open
          receipt={pending}
        />
      )}
    </div>
  );
};
