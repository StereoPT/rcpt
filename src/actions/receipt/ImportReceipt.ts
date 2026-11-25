"use server";

import {
  parseReceiptText,
  type ParseResult,
} from "@/lib/pingoDoce/parseReceiptText";
import { extractText, getDocumentProxy } from "unpdf";

const MAX_BYTES = 5 * 1024 * 1024;

/** Parses a Pingo Doce PDF into a draft. Nothing is persisted. */
export const ImportReceipt = async (
  formData: FormData,
): Promise<ParseResult> => {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose a PDF file to import." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "This file is too large (5 MB max)." };
  }

  let text: string;
  try {
    const pdf = await getDocumentProxy(
      new Uint8Array(await file.arrayBuffer()),
    );
    ({ text } = await extractText(pdf, { mergePages: true }));
  } catch {
    return { ok: false, error: "This file is not a valid PDF." };
  }

  return parseReceiptText(text);
};
