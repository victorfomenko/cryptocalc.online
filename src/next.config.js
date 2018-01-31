module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.module = config.module || {};

      // Rules
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: { loader: 'prettier-loader' },
      });

      // Plugins
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins = config.plugins || [];
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
  },
};
