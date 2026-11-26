"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/formatter";
import type { CreateReceiptInput } from "@/schemas/receipt";
import { TriangleAlert } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

export const TotalDifferenceAlert = () => {
  const { control } = useFormContext<CreateReceiptInput>();
  const [total, lineItems] = useWatch({
    control,
    name: ["total", "lineItems"],
  });

  const sum = lineItems.reduce((acc, item) => acc + item.netAmount, 0);
  const difference = Math.round((total - sum) * 100) / 100;

  if (!difference) return null;

  return (
    <Alert variant="destructive">
      <TriangleAlert />
      <AlertTitle>Line Items do not match the total</AlertTitle>
      <AlertDescription>
        The total is {formatCurrency(Math.abs(difference))}{" "}
        {difference > 0 ? "more" : "less"} than the sum of the Line Items. Check
        for missing or mis-read lines; you can still import.
      </AlertDescription>
    </Alert>
  );
};
