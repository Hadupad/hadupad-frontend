// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',
//   images: {
//     unoptimized: true, // THIS disables the Image Optimization API
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
