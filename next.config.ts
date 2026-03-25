const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.onramp.itzeyz.com/:path*",
      },
    ];
  },
};

export default nextConfig;
