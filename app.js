var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));

const config = require("./utils/config.js");
console.log("config:", config);
const { createProxyMiddleware } = require("http-proxy-middleware");

// proxy management
app.use(
  "/api",
  createProxyMiddleware({
    target: config.API_URL,
    changeOrigin: true,
    logLevel: "debug",
    /* If we wanted that the call to http://localhost/api were transformed to API_URL/ (instead of API_URL/api/)
  /*pathRewrite: {
      '^/api/': '/' // remove base path
    },*/
  })
);

app.use(express.static(path.join(__dirname, "public")));
// not found in static files, so default to index.html
app.use((req, res, next) => {
  //if (!req.path.startsWith("/api/"))
  return res.sendFile(`${__dirname}/public/index.html`);
  next();
});

module.exports = app;
