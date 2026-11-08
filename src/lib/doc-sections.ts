export const docSections = [
  {
    title: 'Keycloak',
    description: 'The identity server Janus runs on',
    url: '/docs',
  },
  {
    title: 'Identicon',
    description: 'Deterministic SVG identicons',
    url: '/docs/identicon',
  },
  {
    title: 'CaaS',
    description: 'OpenTofu configuration for Keycloak',
    url: '/docs/caas',
  },
  {
    title: 'Container',
    description: 'The Janus Keycloak image',
    url: '/docs/container',
  },
  {
    title: 'Events',
    description: 'Keycloak events through Kete and NATS',
    url: '/docs/events',
  },
  {
    title: 'Mail proxy',
    description: 'Coming soon. A proxied email per connection, as the blog describes it.',
    url: '/docs/mail-proxy',
  },
  {
    title: 'Skills',
    description: 'Agent skill SKILL.md, Apache-2.0, version 1.1.',
    url: '/docs/skills',
  },
] as const;
