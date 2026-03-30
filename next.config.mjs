/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 문법 검사 에러 무시
  },
  typescript: {
    ignoreBuildErrors: true, // 타입 에러 무시
  },
};

export default nextConfig;
