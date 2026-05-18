/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/apply', destination: '/#apply-cta', permanent: false },
    ];
  },
};

export default nextConfig;
