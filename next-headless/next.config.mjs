// @ts-check

/** @type {import('next').NextConfig} */

import nextI18NextConfig from "./next-i18next.config.js";

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // port: "",
        // pathname: "/account123/**",
        // search: "",
      },
    ],
    // domains: ["lh3.googleusercontent.com"], // deprecated
  },
  i18n: nextI18NextConfig.i18n,
};

export default nextConfig;
