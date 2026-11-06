import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/spacious';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import { baseOptions } from '@/lib/layout.shared';
import { DocsHeaderActions, DocsMobileHeader } from '@/components/docs-header';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const base = baseOptions();
  const links = (base.links ?? []).flatMap((link): LinkItemType[] => {
    if (link.type === 'menu') return [];
    if (link.type === 'icon') return [link];
    return [{ ...link, on: 'nav' as const }];
  });

  return (
    <DocsLayout
      {...base}
      links={links}
      tree={source.getPageTree()}
      slots={{
        header: DocsMobileHeader,
        actions: DocsHeaderActions,
      }}
    >
      {children}
    </DocsLayout>
  );
}
