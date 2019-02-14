var httpProxy = require('http-proxy');
var proxy=httpProxy.createProxyServer({target:'http://www.cherryvenus.com',selfHandleResponse : true}).listen(8080); 
proxy.on('proxyRes', function (proxyRes, req, res) {
    var body = new Buffer('');
    proxyRes.on('data', function (data) {
        console.log("res from data:", data);
        body = Buffer.concat([body, data]);
    });
    proxyRes.on('end', function () {
        body = Buffer.from(body);
        for(let i in proxyRes.headers){
            res.setHeader(i, proxyRes.headers[i]);
        }
        res.write(body);
        res.end();
    });
});
