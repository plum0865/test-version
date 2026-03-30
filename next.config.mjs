/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 서버 컴포넌트 외부 패키지 최적화 (차트 라이브러리용)
  experimental: {
    serverComponentsExternalPackages: ["recharts"],
  },
};

export default nextConfig;
