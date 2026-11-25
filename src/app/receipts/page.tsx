import { getQueryClient } from "@/lib/getQueryClient";
import { getReceiptsOptions } from "@/lib/queryOptions/receipt";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Link from "next/link";
import { ReceiptsTable } from "./ReceiptsTable";

export const dynamic = "force-dynamic";

const ReceiptsPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getReceiptsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mx-auto max-w-5xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Receipts
          </h1>
          <Button
            nativeButton={false}
            render={<Link href="/receipts/import" />}
          >
            <Upload /> Import
          </Button>
        </div>
        <ReceiptsTable />
      </main>
    </HydrationBoundary>
  );
};

export default ReceiptsPage;
