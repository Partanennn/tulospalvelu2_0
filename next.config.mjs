/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tulospalvelu.leijonat.fi/:path*",
      },
    ];
  },
};

export default nextConfig;
