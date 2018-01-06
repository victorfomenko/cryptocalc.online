const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.API_HOST': prod ? 'http://localhost:3000' : 'http://localhost:3000'
}