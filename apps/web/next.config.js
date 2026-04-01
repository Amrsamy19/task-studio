/** @type {import('next').NextConfig} */
const nextConfig = {
  // Revalidate task data every 30 seconds — fresh enough for an internal tool
  // without hammering the API on every request
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

module.exports = nextConfig;
