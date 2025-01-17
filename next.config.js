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
  async redirects() {
    return [
      {
        source: "/select-mode",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
