import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
     domains: ['i.imgur.com'],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve('./');
    return config;
  },
};

export default nextConfig;
