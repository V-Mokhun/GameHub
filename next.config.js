/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.igdb.com', 'i.ytimg.com', 'res.cloudinary.com']
  },
  async rewrites() {
    return [
      {
        source: "/api/igdb/:path*",
        destination: process.env.NEXT_PUBLIC_GAMES_API_URL + "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
