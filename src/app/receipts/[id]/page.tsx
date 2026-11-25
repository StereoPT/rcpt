import { getQueryClient } from "@/lib/getQueryClient";
import { getReceiptOptions } from "@/lib/queryOptions/receipt";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { ReceiptDetail } from "./ReceiptDetail";

export const dynamic = "force-dynamic";

const ReceiptPage = async ({ params }: PageProps<"/receipts/[id]">) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  const receiptOptions = getReceiptOptions(id);
  await queryClient.prefetchQuery(receiptOptions);

  if (!queryClient.getQueryData(receiptOptions.queryKey)) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mx-auto max-w-4xl space-y-6 p-6">
        <ReceiptDetail id={id} />
      </main>
    </HydrationBoundary>
  );
};

export default ReceiptPage;
