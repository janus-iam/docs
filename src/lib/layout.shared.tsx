import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export const sectionLinks: LinkItemType[] = [
  {
    text: 'Documentation',
    url: '/docs',
    active: 'nested-url',
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
