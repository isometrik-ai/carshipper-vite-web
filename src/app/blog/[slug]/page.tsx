'use client';

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { useBlogPost } from "@/api/blog";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/ui/page-skeleton";

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = useMemo(() => (typeof params?.slug === "string" ? params.slug : ""), [params?.slug]);
  const { data: post, isLoading, isError } = useBlogPost(slug);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError || !post) {
    return (
      <main className="container mx-auto px-4 py-24">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Post not found</h1>
        <p className="text-muted-foreground">The post you are looking for is unavailable.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-24">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        {post.date ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
        ) : null}
        <div
          className="prose prose-neutral max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>
    </main>
  );
}
