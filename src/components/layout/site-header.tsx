import Link from "next/link";

import { Button } from "~/components/ui/button";
import { contactNavItem, mainNav } from "~/config/site";
import { Container } from "./container";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export function SiteHeader() {
  return (
    <header className="bg-ink-800 text-white">
      <Container className="flex h-20 items-center justify-between gap-8 lg:grid lg:h-22 lg:grid-cols-[1fr_auto_1fr]">
        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Logo className="h-9 lg:h-10" />

        <div className="flex items-center justify-end">
          <Button asChild className="hidden lg:inline-flex">
            <Link href={contactNavItem.href}>{contactNavItem.label}</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
