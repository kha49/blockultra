// @ts-check

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
