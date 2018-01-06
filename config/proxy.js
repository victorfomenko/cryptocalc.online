module.exports = {
    '/api': {
        target: 'http://whattomine.com',
        pathRewrite: {'^/api': '/'},
        changeOrigin: true,
    }
}