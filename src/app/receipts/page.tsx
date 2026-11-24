import { ReceiptsTable } from "./ReceiptsTable";

const ReceiptsPage = () => {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Receipts
      </h1>
      <ReceiptsTable />
    </main>
  );
};

export default ReceiptsPage;
