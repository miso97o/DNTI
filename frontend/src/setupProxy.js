const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:9090",
      // target: "http://j7a601.p.ssafy.io",
      changeOrigin: true,
    })
  );
};
