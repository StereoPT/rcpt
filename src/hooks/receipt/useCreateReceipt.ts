import { CreateReceipt } from "@/actions/receipt/CreateReceipt";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import type { CreateReceiptInput } from "@/schemas/receipt";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateReceiptInput) => CreateReceipt(input),
    onSuccess: () => {
      toast.add({ title: "Receipt imported", type: "success" });

      return queryClient.invalidateQueries({ queryKey: KEYS.receipts });
    },
    onError: ({ message }) => {
      toast.add({
        title: "Failed to save Receipt",
        description: message || "Please try again later",
        type: "error",
      });
    },
  });
};
