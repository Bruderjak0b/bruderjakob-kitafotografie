"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";

import { cn } from "~/lib/utils";

export function NavLink({
  className,
  href,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "font-semibold transition-colors duration-150 hover:text-terracotta-300 aria-[current=page]:text-terracotta-400",
        className,
      )}
      {...props}
    />
  );
}
