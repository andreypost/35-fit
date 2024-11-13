// @ts-check

/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

module.exports = {
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
  i18n,
};
