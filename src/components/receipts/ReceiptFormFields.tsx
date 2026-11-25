"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { EditReceiptInput } from "@/schemas/receipt";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

type ReceiptFormFieldsProps = {
  formId: string;
};

export const ReceiptFormFields = ({ formId }: ReceiptFormFieldsProps) => {
  const { control } = useFormContext<EditReceiptInput>();

  return (
    <FieldGroup>
      <Controller
        control={control}
        name="store"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={`${formId}-store`}>Store</FieldLabel>
            <Input {...field} id={`${formId}-store`} placeholder="Store" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <FieldGroup className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="date"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${formId}-date`}>Date</FieldLabel>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                      id={`${formId}-date`}
                      variant="outline"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Receipt date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  }
                />
                <PopoverContent align="center" className="w-auto p-0">
                  <Calendar
                    captionLayout="dropdown"
                    mode="single"
                    onSelect={field.onChange}
                    required
                    selected={field.value}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="total"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${formId}-total`}>Total (€)</FieldLabel>
              <Input
                {...field}
                id={`${formId}-total`}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                placeholder="Total"
                step="0.01"
                type="number"
                value={Number.isNaN(field.value) ? "" : field.value}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </FieldGroup>
  );
};
