const path = require('path');
import tailwindcss from '@tailwindcss/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './src');
    return config;
  },
};

export default tailwindcss(nextConfig);


