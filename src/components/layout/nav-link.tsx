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
        "relative py-1 font-semibold text-terracotta-100 transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-terracotta-400 after:opacity-0 after:transition-opacity after:duration-150 hover:text-white aria-[current=page]:text-white aria-[current=page]:after:opacity-100",
        className,
      )}
      {...props}
    />
  );
}
