/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chwqenkkimefffytqafr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**", // or "/a/ACg8ocIB3dmF..." if you want to be specific
      },
    ],
  },
};

export default nextConfig;
