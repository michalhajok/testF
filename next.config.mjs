/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15.3 specific configurations
  turbopack: {
    // Enable Turbopack for faster builds
    experimental: true,
  },

  // Healthcare-specific configurations
  experimental: {
    // Enable Server Actions for form handling
    serverActions: true,

    // Enable new navigation hooks
    enableNavigationHooks: true,

    // Client instrumentation for healthcare analytics
    enableClientInstrumentation: true,

    // Dynamic rendering optimizations
    dynamicIO: true,
  },

  // Image optimization for medical images
  images: {
    domains: ["localhost", "your-backend-domain.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-backend-domain.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // API routes configuration
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.BACKEND_URL + "/api/:path*",
      },
    ];
  },

  // Headers for security (important for healthcare)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Webpack configuration for healthcare-specific optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Healthcare-specific webpack optimizations
    if (!dev && !isServer) {
      // Optimize for medical applications
      config.optimization.splitChunks.chunks = "all";
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        medical: {
          name: "medical",
          chunks: "all",
          test: /[\\/]src[\\/](components|hooks|lib)[\\/](medical|healthcare)/,
          priority: 20,
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;
