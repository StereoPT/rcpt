import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-4 text-2xl font-semibold">Page Not Found</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          We couldn&apos;t find what you were looking for.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/receipts" />}
          size="lg"
        >
          <ArrowLeft />
          Back to Receipts
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
