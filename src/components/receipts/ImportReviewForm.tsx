"use client";

import { ReceiptFormFields } from "@/components/receipts/ReceiptFormFields";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ReceiptDraft } from "@/lib/pingoDoce/parseReceiptText";
import {
  type CreateReceiptInput,
  createReceiptSchema,
} from "@/schemas/receipt";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, TriangleAlert } from "lucide-react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
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

        <div className="space-y-2">
          <p className="text-sm font-medium">Line Items</p>
          {fields.map((field, index) => (
            <div
              className="grid grid-cols-[1fr_5rem_6rem_auto] items-start gap-2"
              key={field.id}
            >
              <Controller
                control={form.control}
                name={`lineItems.${index}.description`}
                render={({ field, fieldState }) => (
                  <div>
                    <Input {...field} aria-label="Description" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
              <Controller
                control={form.control}
                name={`lineItems.${index}.quantity`}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      aria-label="Quantity"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      step="any"
                      type="number"
                      value={Number.isNaN(field.value) ? "" : field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
              <Controller
                control={form.control}
                name={`lineItems.${index}.netAmount`}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      aria-label="Net amount"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      step="0.01"
                      type="number"
                      value={Number.isNaN(field.value) ? "" : field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
              <Button
                aria-label="Remove Line Item"
                onClick={() => remove(index)}
                size="icon"
                type="button"
                variant="destructive"
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          {form.formState.errors.lineItems?.message && (
            <FieldError errors={[form.formState.errors.lineItems]} />
          )}
          <Button
            onClick={() =>
              append({ description: "", quantity: 1, netAmount: 0 })
            }
            size="sm"
            type="button"
            variant="outline"
          >
            <Plus /> Add Line Item
          </Button>
        </div>
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
