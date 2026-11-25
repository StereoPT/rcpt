import type { ReceiptDraft } from "@/lib/pingoDoce/parseReceiptText";
import { atom } from "jotai";

export const receiptDraftAtom = atom<ReceiptDraft | null>(null);
