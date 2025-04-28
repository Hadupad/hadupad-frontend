/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
  images: {
    unoptimized: true, // THIS disables the Image Optimization API
  },
};

export default nextConfig;
