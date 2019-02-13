const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler,{
  log: false,
  path: "/__what",
  heartbeat: 2000
}));

//proxy
var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://www.cherryvenus.com/";
var proxyOption ={target:proxyPath,changeOrigoin:false};
app.use(proxyMiddleWare("/slider",proxyOption))


app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});