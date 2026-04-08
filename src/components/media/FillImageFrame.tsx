import React, { type ReactNode } from "react";
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
  // Enforce 'object-cover' class for images with 'fill' layout if children include images
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === 'img') {
      const existingClass = child.props.className || '';
      // Add 'object-cover' if not present
      const newClassName = existingClass.includes('object-cover') ? existingClass : `${existingClass} object-cover`;
      return React.cloneElement(child, { className: newClassName });
    }
    return child;
  });
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        fullBleed ? "h-full min-h-full w-full" : aspectClassName,
        className
      )}
    >
      {enhancedChildren}
    </div>
  );
}
