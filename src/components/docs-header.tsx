'use client';

import type { ComponentProps } from 'react';
import { SidebarIcon } from 'lucide-react';
import { SidebarTrigger } from 'fumadocs-ui/components/sidebar/base';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useSpaciousLayout } from 'fumadocs-ui/layouts/spacious';
import { HeaderActions } from 'fumadocs-ui/layouts/spacious/slots/actions';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import Link from 'fumadocs-core/link';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import { LinkItem, type LinkItemType, type MenuItemType } from 'fumadocs-ui/layouts/shared';
import { cn } from '@/lib/cn';

function navEntries(items: LinkItemType[]) {
  return items.filter((item) => item.type !== 'icon');
}

function DocsNavMenu({ item }: { item: MenuItemType }) {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex">
        <NavbarMenu>
          <NavbarMenuTrigger>
            {item.url ? <Link href={item.url}>{item.text}</Link> : item.text}
          </NavbarMenuTrigger>
          <NavbarMenuContent className="w-[min(42rem,calc(100vw-2rem))] lg:grid-cols-2">
            {item.items.map((child, index) =>
              child.type === 'custom' ? (
                child.children
              ) : (
                <NavbarMenuLink key={child.url ?? index} href={child.url}>
                  {child.icon ? (
                    <span className="w-fit rounded-md border bg-fd-muted p-1 text-fd-muted-foreground [&_svg]:size-4">
                      {child.icon}
                    </span>
                  ) : null}
                  <p className="text-base font-medium">{child.text}</p>
                  {child.description ? (
                    <p className="text-sm text-fd-muted-foreground">{child.description}</p>
                  ) : null}
                </NavbarMenuLink>
              ),
            )}
          </NavbarMenuContent>
        </NavbarMenu>
      </NavigationMenu.List>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          align="start"
          side="bottom"
          sideOffset={8}
          className="z-50"
        >
          <NavigationMenu.Popup className="w-[min(42rem,calc(100vw-2rem))] rounded-xl border bg-fd-popover/80 text-fd-popover-foreground shadow-lg backdrop-blur-md">
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

const linkClass =
  'text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary';

function SectionLinks({ className }: { className?: string }) {
  const { navItems } = useSpaciousLayout();

  return (
    <nav className={cn('flex items-center gap-4', className)}>
      {navEntries(navItems).map((item, index) =>
        item.type === 'menu' ? (
          <DocsNavMenu key={item.url ?? index} item={item} />
        ) : item.type === 'custom' ? (
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
