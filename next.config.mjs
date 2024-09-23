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
      {
        protocol: "https",
        hostname: "tulospalvelu.leijonat.fi",
        port: "",
        pathname: "/images/players/webphotos/200w/**",
      },
    ],
  },
};

export default nextConfig;
