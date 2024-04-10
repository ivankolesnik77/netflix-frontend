/** @type {import('next').NextConfig} */
const withImages = require("next-images");

const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_DOMAIN: "http://localhost:3000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/350/**",
      },
      {
        protocol: "https",
        hostname: "assets.nflxext.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    relay: {
      src: "./",
      artifactDirectory: "./src/__generated__",
      language: "typescript",
      eagerEsModules: false,
    },
  },
};

module.exports = nextConfig;
