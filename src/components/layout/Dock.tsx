"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { House, type LucideIcon, Receipt } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DockItem = {
  icon: LucideIcon;
  title: string;
  url: string;
};

const DOCK_ITEMS: DockItem[] = [
  { icon: House, title: "Home", url: ROUTES.home },
  { icon: Receipt, title: "Receipts", url: ROUTES.receipts },
];

const isActive = (url: string, pathname: string) => {
  if (url === ROUTES.home) return pathname === ROUTES.home;

  return pathname === url || pathname.startsWith(`${url}/`);
};

export const Dock = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
    >
      <ul className="flex items-center gap-1.5 rounded-[calc(var(--radius-lg)+0.4375rem)] border border-border/60 bg-background/90 p-1.5 shadow-xl ring-1 ring-foreground/5 backdrop-blur-xl supports-backdrop-filter:bg-background/70">
        {DOCK_ITEMS.map(({ icon: Icon, title, url }) => {
          const active = isActive(url, pathname);

          return (
            <li key={url}>
              <Button
                aria-current={active ? "page" : undefined}
                aria-label={title}
                className={cn(
                  "h-10 px-6 font-semibold",
                  !active && "text-muted-foreground",
                )}
                nativeButton={false}
                render={<Link href={url} />}
                variant={active ? "default" : "ghost"}
              >
                <Icon />
                <span className={cn(!active && "hidden sm:inline")}>
                  {title}
                </span>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
