import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/Users/alina/gfc-next',
  },
};

export default withNextIntl(nextConfig);
