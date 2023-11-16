const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The path to proxy (e.g., /api/register)
    createProxyMiddleware({
      target: 'http://localhost:7000', // The address of your Node.js server
      changeOrigin: true,
    })
  );
};
