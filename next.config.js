// /**
//  * @type {import('next').NextConfig}
//  */

// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   register: true,
//   skipWaiting: true,
//   // scope: '/app',
//   // sw: 'service-worker.js',
//   //...
// });

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   compiler: {
//     removeConsole: process.env.NODE_ENV !== "development",
//   },
//   images: {
//     domains: ["res.cloudinary.com", "localhost"],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   },
// };

// module.exports = (_phase, { defaultConfig }) => {
//   const plugins = [withPWA];
//   return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
// };
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    domains: ["res.cloudinary.com", "localhost"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
});
