"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { contactNavItem, mainNav } from "~/config/site";
import { NavLink } from "./nav-link";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white lg:hidden"
        >
          <MenuIcon className="size-6" />
          <span className="sr-only">Menü öffnen</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="border-ink-700 bg-ink-800 px-6 pt-20 text-white [&_[data-slot=sheet-close]]:text-white [&_[data-slot=sheet-close]:hover]:bg-white/10">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav aria-label="Mobile Navigation">
          <ul className="flex flex-col gap-6 text-xl">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} onClick={close}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="lg" className="mt-4">
          <Link href={contactNavItem.href} onClick={close}>
            {contactNavItem.label}
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
