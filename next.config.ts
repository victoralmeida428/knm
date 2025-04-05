import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.knm.srv.br', // Domínio permitido
                port: '', // Porta vazia (usa a padrão do protocolo)
                pathname: '/wp-content/uploads/**', // Caminho das imagens
            },
        ],
        // Opcional: Defina um formato padrão para otimização
        formats: ['image/webp'],
    },
};

export default nextConfig;
