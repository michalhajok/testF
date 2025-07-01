// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:3001",
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  },
};

export default nextConfig;
