import { Dock } from "@/components/layout/Dock";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col pb-24 *:w-full">{children}</div>
      <Dock />
    </div>
  );
};

export default DashboardLayout;
