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
] as const;
