/** @type {import('next').NextConfig} */
const nextConfig = {
  // skip eslint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  //skip all the typescript errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
