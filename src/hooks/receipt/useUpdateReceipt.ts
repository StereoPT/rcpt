import { UpdateReceipt } from "@/actions/receipt/UpdateReceipt";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import type { EditReceiptInput } from "@/schemas/receipt";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateReceipt = (receiptId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: EditReceiptInput) => {
      return UpdateReceipt(receiptId, input);
    },
    onSuccess: () => {
      toast.add({ title: "Receipt updated", type: "success" });

      return queryClient.invalidateQueries({ queryKey: KEYS.receipts });
    },
    onError: ({ message }) => {
      toast.add({
        title: "Failed to update Receipt",
        description: message || "Please try again later",
        type: "error",
      });
    },
  });
};
