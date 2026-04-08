import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_ICON } from "@/lib/icons";
import type { NavLink } from "@/types/Header.types";
import Link from "next/link";

type HeaderLoadingSkeletonProps = {
  logoText: string;
  logoHighlight: string;
  navLinks: NavLink[];
};

/**
 * Shared fixed-header loading placeholder.
 * Mirrors the final header layout (logo, nav, phone/CTA, mobile toggle) to minimize CLS.
 */
export default function HeaderLoadingSkeleton({
  logoText,
  logoHighlight,
  navLinks,
}: HeaderLoadingSkeletonProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div
          className="flex items-center justify-between gap-4 h-16 md:h-20"
          role="status"
          aria-label="Loading site header"
        >
          <Link href="/" className="flex items-center gap-2" aria-label={`${logoText}${logoHighlight} - Home`}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <DEFAULT_ICON className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-foreground">
              {logoText}
              <span className="text-accent">{logoHighlight}</span>
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8" aria-hidden="true">
              {navLinks.map((link) => (
                <Skeleton key={link.id} className="h-4 w-16 lg:w-20 shrink-0" />
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-36 rounded-md" />
            </div>

            <Skeleton className="md:hidden h-10 w-10 shrink-0 rounded-lg" aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}
