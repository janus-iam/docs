import { governance } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/governance'>) {
  const base = baseOptions();

  return (
    <DocsLayout {...base} nav={{ ...base.nav, mode: 'top' }} tree={governance.getPageTree()}>
      {children}
    </DocsLayout>
  );
}
