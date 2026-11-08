import { Blocks, BookOpen, Container, House, KeyRound, Mail, Radio, ScanFace } from 'lucide-react';
import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { docSections } from './doc-sections';
import { appName, gitConfig } from './shared';

const sectionIcons = {
  Keycloak: <KeyRound />,
  Identicon: <ScanFace />,
  CaaS: <Blocks />,
  Container: <Container />,
  Events: <Radio />,
  'Mail proxy': <Mail />,
  Skills: <BookOpen />,
  Domus: <House />,
} as const;

export const sectionLinks: LinkItemType[] = [
  {
    type: 'menu',
    text: 'Documentation',
    url: '/docs',
    active: 'nested-url',
    items: docSections.map((section) => ({
      text: section.title,
      description: section.description,
      url: section.url,
      icon: sectionIcons[section.title],
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
