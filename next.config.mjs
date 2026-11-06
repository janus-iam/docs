import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/docs/blog', destination: '/blog', permanent: true },
      { source: '/docs/blog/:path*', destination: '/blog/:path*', permanent: true },
      { source: '/docs/governance', destination: '/governance', permanent: true },
      {
        source: '/docs/governance/:path*',
        destination: '/governance/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
