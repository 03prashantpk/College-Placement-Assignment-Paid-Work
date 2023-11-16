const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The path you want to proxy (e.g., /api or /server)
    createProxyMiddleware({
      target: 'http://127.0.0.1:7000', // The address of your Node.js server
      changeOrigin: true,
    })
  );
};
