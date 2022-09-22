const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://j7a601.p.ssafy.io/api",
      changeOrigin: true,
    })
  );
};
