const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 이미지 도메인 설정
  images: {
    domains: ['api.your-domain.com', 'localhost'],
  },
  
  // 환경 변수 설정
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_PATH: process.env.NEXT_PUBLIC_API_PATH,
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
    NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  },
  
  // 웹팩 설정
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),
      '@components': path.join(__dirname, 'src/components'),
      '@lib': path.join(__dirname, 'src/lib'),
      '@hooks': path.join(__dirname, 'src/hooks'),
      '@store': path.join(__dirname, 'src/store'),
      '@types': path.join(__dirname, 'src/types'),
      '@styles': path.join(__dirname, 'src/styles'),
      '@datas': path.join(__dirname, 'src/datas'),
    };
    return config;
  },
  
  // API 리다이렉션 설정
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATH}/:path*`,
      },
    ];
  },
  
  // CORS 설정
  async headers() {
    return process.env.NEXT_PUBLIC_ENV === 'development' || process.env.NEXT_PUBLIC_ENV === 'local'
      ? [
          {
            source: '/api/:path*',
            headers: [
              { key: 'Access-Control-Allow-Origin', value: '*' },
              { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,PATCH,OPTIONS' },
              { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With,content-type,Authorization' },
            ],
          },
        ]
      : [];
  },
};

module.exports = nextConfig;