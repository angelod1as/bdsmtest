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
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    return config
  },
}

module.exports = nextConfig
