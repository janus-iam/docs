'use client';

import { useRef, useState } from 'react';
import { Blocks, Container, KeyRound, Radio, ScanFace } from 'lucide-react';
import Link from 'fumadocs-core/link';
import { usePathname } from 'fumadocs-core/framework';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { docSections } from '@/lib/doc-sections';
import { cn } from '@/lib/cn';

const icons = {
  Keycloak: KeyRound,
  Identicon: ScanFace,
  CaaS: Blocks,
  Container,
  Events: Radio,
} as const;

export function DocumentationMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const active = pathname === '/docs' || pathname.startsWith('/docs/');

  function show() {
    if (closeTimer.current != null) window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function hide() {
    if (closeTimer.current != null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        nativeButton={false}
        className={cn(
          'text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[popup-open]:text-fd-accent-foreground',
          active && 'text-fd-primary',
        )}
        onPointerEnter={show}
        onPointerLeave={hide}
        render={<Link href="/docs" />}
      >
        Documentation
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[min(40rem,calc(100vw-2rem))] p-3"
        onPointerEnter={show}
        onPointerLeave={hide}
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {docSections.map((section) => {
            const Icon = icons[section.title];
            return (
              <Link
                key={section.url}
                href={section.url}
                onClick={() => setOpen(false)}
                className="flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground"
              >
                <span className="w-fit rounded-md border bg-fd-muted p-1 text-fd-muted-foreground [&_svg]:size-4">
                  <Icon />
                </span>
                <span className="text-base font-medium">{section.title}</span>
                <span className="text-sm text-fd-muted-foreground">{section.description}</span>
              </Link>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
