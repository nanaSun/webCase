const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
const httpProxy = require('http-proxy');

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));
// app.use(require("webpack-hot-middleware")(compiler,{
//   log: false,
//   path: "/__what",
//   heartbeat: 2000
// }));

// //proxy
// var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://www.cherryvenus.com/";
var proxyOption ={target:proxyPath,changeOrigoin:true};
// app.use('/slider', proxyMiddleWare(proxyOption))
//var proxy=httpProxy.createProxyServer({target:'http://www.cherryvenus.com',selfHandleResponse : true})
const proxy = httpProxy.createProxyServer({})
app.use("/slider/",async (req, res, next)=>{
    proxy.web(req, res, proxyOption,next)
    proxy.on('proxyRes', function (proxyRes, req, res) {
      var body = new Buffer('');
      proxyRes.on('data', function (data) {
          body = Buffer.concat([body, data]);
      });
      proxyRes.on('end', function () {
          body = Buffer.from(body);
          console.log("res from data:", body);
          for(let i in proxyRes.headers){
              res.setHeader(i, proxyRes.headers[i]);
          }
          res.write("aaa");
          res.end();
          
      });
  });  
})


app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});