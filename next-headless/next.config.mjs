/** @type {import('next').NextConfig} */
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
};

export default nextConfig;
