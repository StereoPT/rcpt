"use client";

import { Provider } from "jotai";
import type { ReactNode } from "react";

type ImportReceiptProviderProps = {
  children: ReactNode;
};

export const ImportReceiptProvider = ({
  children,
}: ImportReceiptProviderProps) => {
  return <Provider>{children}</Provider>;
};
