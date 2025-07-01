/** @type {import('tailwindcss').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "asdsa",
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  },
};

export default config;
