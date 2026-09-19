import Image from "next/image";
import Link from "next/link";

import logo from "~/assets/brand/LogoBright.svg";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)}>
      <Image
        src={logo}
        alt={siteConfig.name}
        className="h-full w-auto"
        loading="eager"
      />
    </Link>
  );
}
