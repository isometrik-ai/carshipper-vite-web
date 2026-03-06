'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

const PURGE_TOKEN = process.env.NEXT_PUBLIC_PURGE_CACHE_TOKEN as string | undefined;

/**
 * Purge Cache page – clears React Query cache when visited with valid token.
 * Use: /purge-cache?token=YOUR_SECRET
 * Set NEXT_PUBLIC_PURGE_CACHE_TOKEN in .env to require a token; if unset, purge is allowed (dev).
 */
function PurgeCacheContent() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<"idle" | "success" | "forbidden" | "error">("idle");

  useEffect(() => {
    const token = searchParams.get("token");
    const tokenRequired = PURGE_TOKEN != null && PURGE_TOKEN !== "";
    const allowed = tokenRequired ? token === PURGE_TOKEN : true;

    if (!allowed) {
      setStatus("forbidden");
      return;
    }

    try {
      queryClient.clear();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [queryClient, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-muted/30">
      <div className="max-w-md w-full rounded-lg border bg-card p-6 text-center shadow-sm">
        {status === "idle" ? (
          <p className="text-muted-foreground">Purging cache…</p>
        ) : null}
        {status === "success" ? (
          <>
            <p className="font-medium text-green-600 dark:text-green-400">Cache purged.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              All API cache has been cleared. Next page loads will refetch from the API.
            </p>
          </>
        ) : null}
        {status === "forbidden" ? (
          <p className="text-destructive">Invalid or missing token.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-destructive">Failed to clear cache.</p>
        ) : null}
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-primary underline underline-offset-4 hover:no-underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default function PurgeCache() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PurgeCacheContent />
    </Suspense>
  );
}

