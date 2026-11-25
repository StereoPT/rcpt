"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-4 text-2xl font-semibold">Something went wrong</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          We couldn&apos;t load this page. Please try again.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button onClick={() => reset()} size="lg">
            <RefreshCw />
            Try again
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={ROUTES.receipts} />}
            size="lg"
            variant="outline"
          >
            <ArrowLeft />
            Back to Receipts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
