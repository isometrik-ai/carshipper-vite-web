'use client';

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog route error:", error);
  }, [error]);

  return (
    <main className="flex-1 pt-20">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Unable to load blog content
            </h1>
            <p className="text-muted-foreground mb-8">
              Something went wrong while loading articles. Please try again.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={reset}>Try Again</Button>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

