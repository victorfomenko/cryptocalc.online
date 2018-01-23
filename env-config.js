module.exports = {
  'process.env.REST': process.env.NODE_ENV === 'production' ? 'https://cryptocalc.online/api/' : 'http://localhost:3000/api/'
};
