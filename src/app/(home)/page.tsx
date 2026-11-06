import Link from 'next/link';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/cn';
import { blog } from '@/lib/source';

const dateFormat = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

export default function HomePage() {
  const posts = [...blog.getPages()].sort((a, b) => {
    const aTime = Date.parse(a.data.pubDate ?? '');
    const bTime = Date.parse(b.data.pubDate ?? '');
    return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
  });

  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b">
        <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-6 px-4 py-16 md:py-24">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Janus</h1>
          <p className="max-w-2xl text-lg text-fd-muted-foreground">
            Documentation, blog posts, and governance notes. Janus is built on Keycloak:
            the server image, the OpenTofu configuration, identicons, and the event
            pipeline.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs" className={cn(buttonVariants())}>
              Documentation
            </Link>
            <Link href="/blog" className={cn(buttonVariants({ variant: 'outline' }))}>
              Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-6 px-4 py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">Components</h2>
            <p className="mt-2 text-fd-muted-foreground">
              Keycloak, identicons, configuration, the image, and events.
            </p>
          </div>
          <Cards>
            <Card
              title="Keycloak"
              href="/docs"
              description="Three realms — prod (canens), dev (proca), and ops (carna). A user exists in one realm only."
            />
            <Card
              title="Identicon"
              href="/docs/identicon"
              description="Deterministic SVG identicons: a Rust engine, WebAssembly bindings, and an HTTP API."
            />
            <Card
              title="CaaS"
              href="/docs/caas"
              description="OpenTofu for realms, a read-only master account, and public PKCE clients."
            />
            <Card
              title="Container"
              href="/docs/container"
              description="The Keycloak image. Kete is enabled. A fixed set of Keycloak features is disabled."
            />
            <Card
              title="Events"
              href="/docs/events"
              description="Kete events into four NATS JetStream streams, then ClickHouse or a Bun catcher."
            />
          </Cards>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-6 px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight">Blog</h2>
              <p className="mt-2 text-fd-muted-foreground">
                Sign-in, email masking, authenticator apps, and the security signature.
              </p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-fd-primary">
              All posts
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {posts.map((post) => {
              const parsed = Date.parse(post.data.pubDate ?? '');
              return (
                <Link
                  key={post.url}
                  href={post.url}
                  className="flex flex-col gap-2 rounded-xl border bg-fd-card p-4 transition-colors hover:bg-fd-accent"
                >
                  <p className="font-medium">{post.data.title}</p>
                  <p className="text-sm text-fd-muted-foreground">{post.data.description}</p>
                  {!Number.isNaN(parsed) && (
                    <p className="mt-auto pt-2 text-xs text-fd-primary">
                      {dateFormat.format(parsed)}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-6 px-4 py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">Governance</h2>
            <p className="mt-2 text-fd-muted-foreground">
              Realms, the features the container turns off, and where data lives.
            </p>
          </div>
          <Cards>
            <Card
              title="Janus Realms"
              href="/governance/realms"
              description="canens, proca, and carna."
            />
            <Card
              title="Disabled features"
              href="/governance/transparency"
              description="Keycloak features turned off in the container image."
            />
            <Card
              title="Data location"
              href="/governance/data"
              description="PostgreSQL with replication, and object storage."
            />
          </Cards>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/governance" className={cn(buttonVariants({ variant: 'secondary' }))}>
              Open governance
            </Link>
            <Link
              href="https://github.com/janus-iam/docs"
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              janus-iam/docs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
