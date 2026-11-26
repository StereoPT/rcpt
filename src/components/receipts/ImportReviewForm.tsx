"use client";

import { LineItemsFormFields } from "@/components/receipts/LineItemsFormFields";
import { ReceiptFormFields } from "@/components/receipts/ReceiptFormFields";
import { TotalDifferenceAlert } from "@/components/receipts/TotalDifferenceAlert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ReceiptDraft } from "@/lib/pingoDoce/parseReceiptText";
import {
  type CreateReceiptInput,
  createReceiptSchema,
} from "@/schemas/receipt";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

const formId = "import-receipt";

type ImportReviewFormProps = {
  draft: ReceiptDraft;
  onBack: () => void;
  onSubmit: (values: CreateReceiptInput) => void;
};

export const ImportReviewForm = ({
  draft,
  onBack,
  onSubmit,
}: ImportReviewFormProps) => {
  const form = useForm<CreateReceiptInput>({
    resolver: zodResolver(createReceiptSchema),
    defaultValues: {
      store: draft.store,
      date: draft.date,
      total: draft.total,
      lineItems: draft.lineItems,
    },
  });

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {draft.unparsedLines.length > 0 && (
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertTitle>Some lines could not be read</AlertTitle>
            <AlertDescription>
              Add them as Line Items if needed:{" "}
              {draft.unparsedLines.join(" · ")}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Receipt</CardTitle>
            <CardDescription>Store, date and total as printed.</CardDescription>
          </CardHeader>
          <CardContent>
            <ReceiptFormFields formId={formId} />
          </CardContent>
        </Card>

        <TotalDifferenceAlert />

        <LineItemsFormFields formId={formId} />
      </form>

      <div className="flex justify-end gap-2">
        <Button onClick={onBack} type="button" variant="outline">
          Back
        </Button>
        <Button form={formId} type="submit">
          Import
        </Button>
      </div>
    </FormProvider>
  );
};
