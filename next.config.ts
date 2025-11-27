/** @type {import('next').Config} */
const nextConfig = {
  reactStrictMode: true,
  // Configurações para exportação estática no Surge
  output: 'export', // habilitando export estático para surge :)
  trailingSlash: true, // evita problemas de roteamento no surge
  images: {
    unoptimized: true // desabilitando otimização de imagem pro export estático
  },
  // removendo rewrites e redirects que não funcionam com export estático
  // Permitir acesso de dispositivos na rede local
  // allowedDevOrigins: [
  //   '192.168.0.235',
  //   '192.168.56.1',
  //   'localhost',
  //   '127.0.0.1'
  // ],
};

module.exports = nextConfig;