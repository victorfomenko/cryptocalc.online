module.exports = {
  '/api/currencies': {
    target: 'https://fininfo.iqoption.com',
    pathRewrite: { '/api/currencies/': '/api/currencies' },
    changeOrigin: true,
  },
  '/api/coins': {
    target: 'http://whattomine.com',
    pathRewrite: { '^/api/coins': '/coins' },
    changeOrigin: true,
  },
  '/api/bitfinex': {
    target: 'https://api.bitfinex.com',
    pathRewrite: { '/api/bitfinex': '/v1' },
    changeOrigin: true,
  },
};
