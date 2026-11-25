import { ImportReceipt } from "@/actions/receipt/ImportReceipt";
import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";

export const useImportReceipt = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const result = await ImportReceipt(formData);

      if (!result.ok) {
        throw new Error(result.error);
      }

      return result.draft;
    },
    onError: ({ message }) => {
      toast.add({
        title: "Failed to import Receipt",
        description: message || "Please try again later",
        type: "error",
      });
    },
  });
};
