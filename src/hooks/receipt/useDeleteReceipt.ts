import { DeleteReceipt } from "@/actions/receipt/DeleteReceipt";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReceipt = (receiptId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => DeleteReceipt(receiptId),
    onSuccess: () => {
      toast.add({ title: "Receipt deleted", type: "success" });

      return queryClient.invalidateQueries({ queryKey: KEYS.receipts });
    },
    onError: ({ message }) => {
      toast.add({
        title: "Failed to delete Receipt",
        description: message || "Please try again later",
        type: "error",
      });
    },
  });
};
