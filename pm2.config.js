module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // Application
    {
      name: 'WEB',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        REST: 'REST=https://cryptocalc.online/api/',
        SERVER_PORT: 3000,
      }
    }
  ],
};
