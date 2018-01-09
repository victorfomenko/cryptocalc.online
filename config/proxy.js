module.exports = {
    '/api/currencies': {
        target: 'https://fininfo.iqoption.com',
        changeOrigin: true,
    },
    '/api/coins': {
        target: 'http://whattomine.com',
        pathRewrite: {'^/api/coins': '/coins'},
        changeOrigin: true,
    },
    '/api/bitfinex': {
        target: 'https://api.bitfinex.com/v1',
        pathRewrite: {'^/api/bitfinex': ''},
        changeOrigin: true,
    },
}