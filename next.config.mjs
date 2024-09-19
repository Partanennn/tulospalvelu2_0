/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tulospalvelu.leijonat.fi",
        port: "",
        pathname: "/images/associations/weblogos/200x200/**",
      },
    ],
  },
};

export default nextConfig;
