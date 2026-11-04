import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Rcpt",
  description: "Grocery receipt tracker",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html className={cn("font-sans", nunitoSans.variable)} lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
