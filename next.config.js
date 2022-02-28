/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cleanDistDir: false,
  images: {
    disableStaticImages: true,
    domains: [
      "lh3.googleusercontent.com",
      "icons.iconarchive.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
