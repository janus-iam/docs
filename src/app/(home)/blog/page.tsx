import Link from 'next/link';
import type { Metadata } from 'next';
import { blog } from '@/lib/source';

const dateFormat = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on sign-in, email masking, authenticator apps, and the security signature.',
};

export default function BlogIndexPage() {
  const posts = [...blog.getPages()].sort((a, b) => {
    const aTime = Date.parse(a.data.pubDate ?? '');
    const bTime = Date.parse(b.data.pubDate ?? '');
    return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
  });

  return (
    <main className="mx-auto w-full max-w-(--fd-layout-width) px-4 pt-8 pb-16 md:pt-12">
      <div className="mb-8 rounded-2xl border bg-fd-card px-6 py-8 md:px-10 md:py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-3 max-w-xl text-fd-muted-foreground">
          Notes on sign-in, email masking, authenticator apps, and the security signature.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => {
          const parsed = Date.parse(post.data.pubDate ?? '');
          return (
            <Link
              key={post.url}
              href={post.url}
              className="group flex flex-col rounded-2xl border bg-fd-card p-4 shadow-sm transition-colors hover:bg-fd-accent"
            >
              <p className="font-medium">{post.data.title}</p>
              <p className="mt-1 text-sm text-fd-muted-foreground group-hover:text-fd-accent-foreground">
                {post.data.description}
              </p>
              {!Number.isNaN(parsed) && (
                <p className="mt-auto pt-4 text-xs text-fd-primary">{dateFormat.format(parsed)}</p>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
