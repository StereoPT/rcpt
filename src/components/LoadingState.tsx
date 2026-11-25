import { Spinner } from "@/components/ui/spinner";

export const LoadingState = () => {
  return (
    <div className="flex justify-center">
      <Spinner className="size-12 text-primary" />
    </div>
  );
};
