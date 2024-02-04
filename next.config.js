/** @type {import('next').NextConfig} */

const NEXT_URL = process.env.NEXT_URL;
const NEXT_PUBLIC_API_URI = process.env.NEXT_PUBLIC_API_URI;
const NEXT_PUBLIC_STAGE_API = process.env.NEXT_PUBLIC_STAGE_API;
const STRIPE_PUB_KEY = process.env.NEXT_PUBLIC_STRIPE_PUB_KEY;

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      { hostname: 'artgrade.dev.spacecats.tech' },
      { hostname: 'artgradetemp.s3.amazonaws.com' },
      { hostname: 'valart-stage.dev.spacecats.tech' },
      { hostname: 'd1qr6zr5tmj42w.cloudfront.net' }
    ]
  },
  env: {
    NEXT_URL: NEXT_URL,
    NEXT_PUBLIC_API_URI: NEXT_PUBLIC_API_URI,
    NEXT_PUBLIC_STAGE_API: NEXT_PUBLIC_STAGE_API,
    STRIPE_PUB_KEY: STRIPE_PUB_KEY
  },
  async redirects() {
    return [
      {
        source: '/dashboard/artist',
        destination: '/dashboard/artist/manage-artworks',
        permanent: true
      },
      {
        source: '/dashboard/critic',
        destination: '/dashboard/critic/rate-reviews',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
