const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Cho phép tất cả domain
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};
export default nextConfig;
