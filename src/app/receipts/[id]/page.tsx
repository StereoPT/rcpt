import { ReceiptDetail } from "./ReceiptDetail";

const ReceiptPage = async ({ params }: PageProps<"/receipts/[id]">) => {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <ReceiptDetail id={id} />
    </main>
  );
};

export default ReceiptPage;
