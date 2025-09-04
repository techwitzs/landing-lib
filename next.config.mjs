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
  },
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@core-landing/shared-utils', '@core-landing/shared-ui', '@core-landing/shared-components'],
}

export default nextConfig
