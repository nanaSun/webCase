// var httpProxy = require('http-proxy');
// var proxy=httpProxy.createProxyServer({target:'http://www.baidu.com',selfHandleResponse : true}).listen(9090); 
// proxy.on('proxyRes', function (proxyRes, req, res) {
//     var body = new Buffer('');
//     proxyRes.on('data', function (data) {
//         console.log("res from data:", data);
//         body = Buffer.concat([body, data]);
//     });
//     proxyRes.on('end', function () {
//         body = Buffer.from(body);
//         for(let i in proxyRes.headers){
//             res.setHeader(i, proxyRes.headers[i]);
//         }
//         res.write(body);
//         console.log(res);
//         res.end();
//     });
// });
const http = require('http');
const net = require('net');
const url = require('url');

// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
    console.log("create Proxy")
    // connect to an origin server
    // make a request to a tunneling proxy
    let context=new Buffer("");
    const options = {
        port: 1337,
        host: 'localhost',
        method: 'CONNECT',//会触发"connect" https://nodejs.org/api/http.html#http_event_connect
        path: 'www.ruanyifeng.com:80/home.html'
    };
    const req1 = http.request(options);
    req1.end();
    req1.on('socket',function(socket){
        console.log("socket start")
        socket.setTimeout(5000);
        socket.on('timeout',function(){req1.abort()});
    });
  req1.on('connect', (res1, socket, head) => {
    let context=new Buffer("")
    console.log("connect start")
    // make a request over an HTTP tunnel
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.ruanyifeng.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
        //console.log("connect get data",chunk.toString())
        context = Buffer.concat([context, chunk]);
    });
    socket.on('end', () => {
        
        for(let i in req.headers){
            res.setHeader(i, req.headers[i]);
        }
        context=context.toString().split("\n\r\n")
        context.shift()
        res.end(context.join(""))
    });
  });
}).listen(1337);
proxy.on('connect', (req, cltSocket, head) => {
    // `req` is an http.IncomingMessage, which is a Readable Stream
    // `res` is an http.ServerResponse, which is a Writable Stream
    // connect to an origin server
    //cltSocket 'CONNECT' socket
    const srvUrl = url.parse(`http://${req.url}`);
    const srvSocket = net.connect(srvUrl.port, srvUrl.hostname)
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
    'Proxy-agent: Node.js-Proxy\r\n' +
    '\r\n');
    srvSocket.write(head);
    //管道建立了互读互写
    srvSocket.pipe(cltSocket)
    cltSocket.pipe(srvSocket)
    // srvSocket.on('data', (chunk) => {
    //     console.log(`Received ${chunk.length} bytes of data.`,chunk.toString());
    // });
    // cltSocket.on('data', (chunk) => {
    //     console.log(`Received ${chunk.length} bytes of data.`,chunk.toString());
    // });
  });
 