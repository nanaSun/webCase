const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
const httpProxy = require('http-proxy');

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler,{
  log: false,
  path: "/__what",
  heartbeat: 2000
}));

// //proxy
// var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://www.cherryvenus.com/";
var proxyOption ={target:proxyPath,changeOrigin:true,selfHandleResponse : true,ignorePath:true};
// app.use('/slider', proxyMiddleWare(proxyOption))
//var proxy=httpProxy.createProxyServer({target:'http://www.cherryvenus.com',selfHandleResponse : true})
const proxy = httpProxy.createProxyServer({})
proxy.on('proxyRes', function (proxyRes, req, res) {
    
    var body = new Buffer('');
    for(let i in proxyRes.headers){
        res.setHeader(i, proxyRes.headers[i]);
    }
    proxyRes.on('data', function (data) {
        body = Buffer.concat([body, data]);
    });
    proxyRes.on('end', function () {
        
        body = Buffer.from(body);
        res.write(body);
        res.end()
        res.rs()
    });
    proxyRes.on('error', function (err, req, res) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
    });
})
app.use("/slider/",(req, res, next)=>{
    console.log("bbbbb")
    let p= new Promise((rs,rj)=>{
        proxy.close();
        res.rs=rs
        proxy.web(req, res, proxyOption);
    })
    p.then(()=>{
        next()
    })
    return p
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});