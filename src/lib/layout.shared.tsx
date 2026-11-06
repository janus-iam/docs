import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { DocumentationMenu } from '@/components/documentation-menu';
import { docSections } from './doc-sections';
import { appName, gitConfig } from './shared';

export const sectionLinks: LinkItemType[] = [
  {
    type: 'custom',
    on: 'nav',
    children: <DocumentationMenu />,
  },
  {
    type: 'menu',
    on: 'menu',
    text: 'Documentation',
    url: '/docs',
    active: 'nested-url',
    items: docSections.map((section) => ({
      text: section.title,
      description: section.description,
      url: section.url,
    })),
  },
  {
    text: 'Blog',
    url: '/blog',
    active: 'nested-url',
  },
  {
    text: 'Governance',
    url: '/governance',
    active: 'nested-url',
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: sectionLinks,
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
