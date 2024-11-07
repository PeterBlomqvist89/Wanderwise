/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Lägg till Firebase-domänen här
  },
};

export default nextConfig; // Ändra till export default
