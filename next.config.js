/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: true,
  },
  env: {},
}

module.exports = nextConfig
