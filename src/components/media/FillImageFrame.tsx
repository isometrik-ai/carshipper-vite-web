import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FillImageFrameProps = {
  children: ReactNode;
  className?: string;
  /**
   * Tailwind aspect ratio class for non-full-bleed use cases.
   * @default "aspect-video"
   */
  aspectClassName?: string;
  /**
   * Full-bleed mode for absolute/fill parents (hero backgrounds).
   */
  fullBleed?: boolean;
};

/**
 * Shared frame for fill-based images.
 * Keeps container sizing, overflow clipping, and placeholder background consistent.
 */
export default function FillImageFrame({
  children,
  className,
  aspectClassName = "aspect-video",
  fullBleed = false,
}: FillImageFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        fullBleed ? "h-full min-h-full w-full" : aspectClassName,
        className
      )}
    >
      {children}
    </div>
  );
}
