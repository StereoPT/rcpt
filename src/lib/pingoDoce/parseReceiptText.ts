export type DraftLineItem = {
  description: string;
  quantity: number;
  netAmount: number;
};

export type ReceiptDraft = {
  store: string;
  date: Date;
  total: number;
  lineItems: DraftLineItem[];
  unparsedLines: string[];
};

export type ParseResult =
  | { ok: true; draft: ReceiptDraft }
  | { ok: false; error: string };

const AMOUNT = String.raw`\d{1,3}(?:\.\d{3})*,\d{2}`;
const ITEM_LINE = new RegExp(`^[A-Z] (.+?) (${AMOUNT})$`);
const DISCOUNT_LINE = new RegExp(String.raw`^.+? \((${AMOUNT})\)$`);
const WEIGHED_LINE = /^(\d+,\d+)\s*kg\s*[xX]\s*\d+,\d{2}/i;
const MULTI_LINE = /^(\d+)\s*[xX]\s*\d+,\d{2}/;
const ENDS_WITH_AMOUNT = new RegExp(String.raw`${AMOUNT}\)?$`);

const toNumber = (value: string) =>
  Number(value.replace(/\./g, "").replace(",", "."));

const roundCents = (value: number) => Math.round(value * 100) / 100;

export const parseReceiptText = (text: string): ParseResult => {
  if (text.trim().length === 0) {
    return { ok: false, error: "This PDF has no readable text." };
  }

  if (
    !/pingo\s*doce/i.test(text) ||
    !/Fatura Simplificada|Artigos/.test(text)
  ) {
    return { ok: false, error: "This is not a Pingo Doce receipt." };
  }

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const dateMatch = text.match(
    /Data de emiss[ãa]o:\s*(\d{2})\/(\d{2})\/(\d{4})/,
  );
  const totalMatch = text.match(
    new RegExp(String.raw`TOTAL A PAGAR\s+(${AMOUNT})`),
  );

  if (!dateMatch || !totalMatch) {
    return {
      ok: false,
      error: "Could not find the date or total on this receipt.",
    };
  }

  const [, day, month, year] = dateMatch;
  // Noon UTC so the calendar day survives timezone conversion.
  const date = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day), 12),
  );

  const start = lines.indexOf("Artigos");
  const end = lines.findIndex((line, i) => i > start && line === "Resumo");
  const itemLines =
    start === -1 ? [] : lines.slice(start + 1, end === -1 ? undefined : end);

  const lineItems: DraftLineItem[] = [];
  const unparsedLines: string[] = [];
  let pendingQuantity: number | null = null;

  for (const line of itemLines) {
    const weighed = line.match(WEIGHED_LINE);
    const multi = line.match(MULTI_LINE);
    if (weighed || multi) {
      pendingQuantity = weighed ? toNumber(weighed[1]) : Number(multi?.[1]);
      continue;
    }

    const item = line.match(ITEM_LINE);
    if (item) {
      lineItems.push({
        description: item[1],
        quantity: pendingQuantity ?? 1,
        netAmount: toNumber(item[2]),
      });
      pendingQuantity = null;
      continue;
    }

    const discount = line.match(DISCOUNT_LINE);
    const previous = lineItems.at(-1);
    if (discount && previous) {
      previous.netAmount = roundCents(
        previous.netAmount - toNumber(discount[1]),
      );
      continue;
    }

    if (ENDS_WITH_AMOUNT.test(line)) unparsedLines.push(line);
  }

  if (lineItems.length === 0) {
    return { ok: false, error: "No Line Items were found on this receipt." };
  }

  return {
    ok: true,
    draft: {
      store: "Pingo Doce",
      date,
      total: toNumber(totalMatch[1]),
      lineItems,
      unparsedLines,
    },
  };
};
