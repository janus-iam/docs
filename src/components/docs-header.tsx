'use client';

import type { ComponentProps } from 'react';
import { SidebarIcon } from 'lucide-react';
import { SidebarTrigger } from 'fumadocs-ui/components/sidebar/base';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useSpaciousLayout } from 'fumadocs-ui/layouts/spacious';
import { HeaderActions } from 'fumadocs-ui/layouts/spacious/slots/actions';
import { LinkItem, type LinkItemType } from 'fumadocs-ui/layouts/shared';
import { cn } from '@/lib/cn';

function navEntries(items: LinkItemType[]) {
  return items.filter((item) => item.type !== 'icon' && item.type !== 'menu');
}

const linkClass =
  'text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary';

function SectionLinks({ className }: { className?: string }) {
  const { navItems } = useSpaciousLayout();

  return (
    <nav className={cn('flex items-center gap-4', className)}>
      {navEntries(navItems).map((item, index) =>
        item.type === 'custom' ? (
          <span key={index} className="inline-flex items-center">
            {item.children}
          </span>
        ) : (
          <LinkItem key={item.url} item={item} className={linkClass}>
            {item.text}
          </LinkItem>
        ),
      )}
    </nav>
  );
}

/** Desktop page header: section links, then the spacious actions (GitHub, theme). */
export function DocsHeaderActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('flex min-w-0 items-center gap-4', className)} {...props}>
      <SectionLinks className="max-md:hidden" />
      <HeaderActions />
    </div>
  );
}

/** Mobile bar. The spacious desktop header lives on the page panel. */
export function DocsMobileHeader({ className, ...props }: ComponentProps<'header'>) {
  const { slots } = useSpaciousLayout();

  return (
    <header
      id="nd-subnav"
      className={cn(
        'sticky top-(--fd-banner-height,0px) z-30 flex items-center gap-2 [grid-area:header] h-(--fd-header-height) bg-fd-card ps-4 pe-2.5 md:hidden',
        className,
      )}
      {...props}
    >
      {slots.navTitle && (
        <slots.navTitle className="inline-flex shrink-0 items-center gap-2.5 font-semibold" />
      )}
      <SectionLinks className="min-w-0 flex-1 overflow-x-auto" />
      {slots.searchTrigger && (
        <slots.searchTrigger.sm hideIfDisabled className="p-2" />
      )}
      <SidebarTrigger
        className={buttonVariants({
          variant: 'ghost',
          size: 'icon-sm',
          className: 'p-2',
        })}
      >
        <SidebarIcon />
      </SidebarTrigger>
    </header>
  );
}
