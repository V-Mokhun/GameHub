/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.igdb.com']
  },
  async rewrites() {
    return [
      {
        source: "/api/games/:path*",
        destination: process.env.NEXT_PUBLIC_GAMES_API_URL + "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
