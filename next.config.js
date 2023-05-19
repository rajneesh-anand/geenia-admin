/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  i18n,
  ...(process.env.NODE_ENV === "production" && {
    typescript: {
      ignoreBuildErrors: true,
    },
  }),
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withPWA];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
