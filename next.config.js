/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.docx$/,
      use: 'raw-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
