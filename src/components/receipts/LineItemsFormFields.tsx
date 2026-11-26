"use client";

import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { CreateReceiptInput } from "@/schemas/receipt";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

type LineItemsFormFieldsProps = {
  formId: string;
};

export const LineItemsFormFields = ({ formId }: LineItemsFormFieldsProps) => {
  const form = useFormContext<CreateReceiptInput>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  return (
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
                <Input
                  {...field}
                  aria-label="Description"
                  id={`${formId}-lineItems-${index}-description`}
                />
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
                  id={`${formId}-lineItems-${index}-quantity`}
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
                  id={`${formId}-lineItems-${index}-netAmount`}
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
        onClick={() => append({ description: "", quantity: 1, netAmount: 0 })}
        size="sm"
        type="button"
        variant="outline"
      >
        <Plus /> Add Line Item
      </Button>
    </div>
  );
};
