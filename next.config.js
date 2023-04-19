const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, { isServer }) => {
    // Add support for mp4 files
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: {
        loader: 'url-loader',
        
      }
    });

    return config;
  }
};

module.exports = nextConfig;
