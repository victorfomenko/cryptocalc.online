module.exports = {
  'process.env.REST_URL': process.env.NODE_ENV === 'production' ? 'https://cryptocalc.online/api/' : 'http://localhost:3000/api/'
};
