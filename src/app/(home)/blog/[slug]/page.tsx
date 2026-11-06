import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CornerLeftUpIcon } from 'lucide-react';
import { DocsBody } from 'fumadocs-ui/layouts/notebook/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/components/mdx';
import { blog } from '@/lib/source';

const dateFormat = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

function sortedPosts() {
  return [...blog.getPages()].sort((a, b) => {
    const aTime = Date.parse(a.data.pubDate ?? '');
    const bTime = Date.parse(b.data.pubDate ?? '');
    return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
  });
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const posts = sortedPosts();
  const index = posts.findIndex((post) => post.url === page.url);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined;
  const parsed = Date.parse(page.data.pubDate ?? '');
  const MDX = page.data.body;

  return (
    <article className="mx-auto flex w-full max-w-[900px] flex-col gap-6 px-4 py-8">
      <header className="flex flex-col items-start gap-4 rounded-xl border bg-fd-card px-4 pt-3.5 pb-6 text-fd-card-foreground shadow-inner">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground"
        >
          <CornerLeftUpIcon className="size-3.5" />
          Back to Blog
        </Link>
        <h1 className="text-2xl font-semibold">{page.data.title}</h1>
        {page.data.description && (
          <p className="text-fd-muted-foreground">{page.data.description}</p>
        )}
        {!Number.isNaN(parsed) && (
          <time dateTime={page.data.pubDate} className="text-sm text-fd-muted-foreground">
            {dateFormat.format(parsed)}
          </time>
        )}
      </header>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(blog, page),
          })}
        />
      </DocsBody>
      {(newer || older) && (
        <nav className="grid gap-2 border-t pt-6 sm:grid-cols-2">
          {older ? (
            <Link href={older.url} className="rounded-xl border p-4 hover:bg-fd-accent">
              <p className="text-xs text-fd-muted-foreground">Older</p>
              <p className="font-medium">{older.data.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link href={newer.url} className="rounded-xl border p-4 text-end hover:bg-fd-accent">
              <p className="text-xs text-fd-muted-foreground">Newer</p>
              <p className="font-medium">{newer.data.title}</p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0] ?? '',
  }));
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
