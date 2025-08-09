/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [];
  },
  async redirects() {
    return [];
  },
  // Permitir acesso de dispositivos na rede local
  allowedDevOrigins: [
    '192.168.0.235',
    '192.168.56.1',
    'localhost',
    '127.0.0.1'
  ],
};

module.exports = nextConfig;