/** @type {import('next').NextConfig} */
const nextConfig = {
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
