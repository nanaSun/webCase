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
// const http = require('http');
// const net = require('net');
// const url = require('url');

// // Create an HTTP tunneling proxy
// const proxy = http.createServer((req, res) => {
//     console.log("create Proxy")
//     // connect to an origin server
//     // make a request to a tunneling proxy
//     let context=new Buffer("");
//     const options = {
//         port: 1337,
//         host: 'localhost',
//         method: 'CONNECT',//会触发"connect" https://nodejs.org/api/http.html#http_event_connect
//         path: 'www.baidu.com:80'
//     };
//     const req1 = http.request(options);
//     req1.end();
//     req1.on('socket',function(socket){
//         console.log("socket start")
//         socket.setTimeout(5000);
//         socket.on('timeout',function(){req1.abort()});
//     });
//   req1.on('connect', (res1, socket, head) => {
//     let context=new Buffer("")
//     console.log("connect start")
//     // make a request over an HTTP tunnel
//     socket.write('GET / HTTP/1.1\r\n' +
//                  'Host: www.baidu.com:80\r\n' +
//                  'Connection: close\r\n' +
//                  '\r\n');
//     socket.on('data', (chunk) => {
//         //console.log("connect get data",chunk.toString())
//         context = Buffer.concat([context, chunk]);
//     });
//     socket.on('end', () => {
        
//         for(let i in req.headers){
//             res.setHeader(i, req.headers[i]);
//         }
//         context=context.toString().split("\n\r\n")
//         context.shift()
//         res.end(context.join(""))
//     });
//   });
// }).listen(1337);
// proxy.on('connect', (req, cltSocket, head) => {
//     // `req` is an http.IncomingMessage, which is a Readable Stream
//     // `res` is an http.ServerResponse, which is a Writable Stream
//     // connect to an origin server
//     //cltSocket 'CONNECT' socket
//     const srvUrl = url.parse(`http://${req.url}`);
//     const srvSocket = net.connect(srvUrl.port, srvUrl.hostname)
//     cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
//     'Proxy-agent: Node.js-Proxy\r\n' +
//     '\r\n');
//     srvSocket.write(head);
//     //管道建立了互读互写
//     srvSocket.pipe(cltSocket).pipe(srvSocket)
//     // srvSocket.on('data', (chunk) => {
//     //     console.log(`Received ${chunk.length} bytes of data.`,chunk.toString());
//     // });
//     // cltSocket.on('data', (chunk) => {
//     //     console.log(`Received ${chunk.length} bytes of data.`,chunk.toString());
//     // });
//   });
 

// const http = require('http');
// http.createServer((req,res)=>{
//     res.end(`
//     <script>
//         let ws = new WebSocket('ws://localhost:8888');
//         ws.onopen = function () {
//             console.log('客户端连接成功');
//             ws.send('hello');
//         }
//         ws.onmessage = function (event) {
//             console.log('收到服务器的响应 ' + event.data);
//         }
//         ws.onclose = function (event) {
//             console.log('close ' + event.data);
//         }
//         setTimeout(()=>ws.send('hello'),3000)
//         // setTimeout(()=>ws.close(),4000)
//     </script>
//     `)
// }).listen(8080)
// // let WebSocketServer = require('ws').Server;
// // let wsServer = new WebSocketServer({ port: 8888 });
// // wsServer.on('connection', function (socket) {
// //     console.log('连接成功');
// //     socket.on('message', function (message) {
// //         console.log('接收到客户端消息:' + message);
// //         socket.send('服务器回应:' + message);
// //     });
// //     socket.on('close', function () {
// //         console.log('close');
// //     });
// // });
// const crypto = require('crypto');

// const key = crypto.randomBytes(16).toString('base64');
// const net = require('net');
// const options = {
//     port: 8888,
//     host: 'localhost'
// };
// options.headers = Object.assign(
//     {
//       'Sec-WebSocket-Version': 13,
//       'Sec-WebSocket-Key': key,
//       Connection: 'Upgrade',
//       Upgrade: 'websocket'
//     },
//     options.headers
// );
// let _server = http.createServer((req, res) => {
//     const body = http.STATUS_CODES[426];

//     res.writeHead(426, {
//       'Content-Length': body.length,
//       'Content-Type': 'text/plain'
//     });
//     res.end(body);
//   });
//   _server.listen(options);
//   _server.on("upgrade",(req, socket, head) => {
//       console.log("upgrade")
//       update(req,socket)
//       socket.setTimeout(0);
//         socket.setNoDelay();
//         socket.on('close', ()=>console.log("close"));
//         socket.on('connect', ()=>console.log("connect"));
//         socket.on('data', ()=>{
            
//             socket.pause()
//             let data=new Buffer("aaaa")
//             var offset = options.mask ? 6 : 2;
//             var payloadLength = data.length;
//             const target = Buffer.allocUnsafe(data.length + offset);
//             target[0] = 129
//             target[1] = payloadLength;
//             data.copy(target, offset);
//             socket.write(target,(err)=>{
//                 socket.resume()
//                 console.log(target,err)
//             });
//         });
//         socket.on('drain', ()=>console.log("drain"));
//         socket.on('end', ()=>console.log("end"));
//         socket.on('error', ()=>console.log("error"));
//         socket.on('lookup', ()=>console.log("lookup"));
//         socket.on('ready', ()=>console.log("ready"));
//         socket.on('timeout', ()=>console.log("timeout"));
//     req.on("data",()=>{
//         console.log("req data")
//     })
//     req.on("close",()=>{
//         console.log("end")
//     })
//   })
//   function update(req,socket){
//     const key1=crypto
//     .createHash('sha1')
//     .update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', 'binary')
//     .digest('base64');
//     const headers = [
//         'HTTP/1.1 101 Switching Protocols',
//         'Upgrade: websocket',
//         'Connection: Upgrade',
//         `Sec-WebSocket-Accept: ${key1}`
//       ];
//     socket.write(headers.concat('\r\n').join('\r\n'));
//   }

// const net = require('net');
// const crypto = require('crypto');
// const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
// let server = net.createServer(function (socket) {
//     socket.once('data', function (data) {
//         data = data.toString();
//         if (data.match(/Upgrade: websocket/)) {
//             let rows = data.split('\r\n');//按分割符分开
//             rows = rows.slice(1, -2);//去掉请求行和尾部的二个分隔符
//             const headers = {};
//             rows.forEach(row => {
//                 let [key, value] = row.split(': ');
//                 headers[key] = value;
//             });
//             if (headers['Sec-WebSocket-Version'] == 13) {
//                 let wsKey = headers['Sec-WebSocket-Key'];
//                 let acceptKey = crypto.createHash('sha1').update(wsKey + CODE).digest('base64');
//                 let response = [
//                     'HTTP/1.1 101 Switching Protocols',
//                     'Upgrade: websocket',
//                     `Sec-WebSocket-Accept: ${acceptKey}`,
//                     'Connection: Upgrade',
//                     '\r\n'
//                 ].join('\r\n');
//                 socket.write(response);
//                 socket.on('data', function (buffers) {
//                     let _fin = (buffers[0] & 0b10000000) === 0b10000000;//判断是否是结束位,第一个bit是不是1
//                     let _opcode = buffers[0] & 0b00001111;//取一个字节的后四位,得到的一个是十进制数
//                     let _masked = buffers[1] & 0b100000000 === 0b100000000;//第一位是否是1
//                     let _payloadLength = buffers[1] & 0b01111111;//取得负载数据的长度
//                     let _mask = buffers.slice(2, 6);//掩码
//                     let payload = buffers.slice(6);//负载数据

//                     unmask(payload, _mask);//对数据进行解码处理

//                     //向客户端响应数据
//                     let response = Buffer.alloc(2 + payload.length);
//                     response[0] = _opcode | 0b10000000;//1表示发送结束
//                     response[1] = payload.length;//负载的长度
//                     payload.copy(response, 2);
//                     socket.write(response);
//                 });
//             }

//         }
//     });
//     function unmask(buffer, mask) {
//         const length = buffer.length;
//         for (let i = 0; i < length; i++) {
//             buffer[i] ^= mask[i & 3];
//         }
//     }
//     socket.on('end', function () {
//         console.log('end');
//     });
//     socket.on('close', function () {
//         console.log('close');
//     });
//     socket.on('error', function (error) {
//         console.log(error);
//     });
// });
// server.listen(8888);
// const http=require("http")

// let req=http.get({
//     hostname: 'www.baidu.com',
//     port: 80,
//     path: '/',
//     agent: keepAliveAgent  // create a new agent just for this one request
//   });
//超简易proxy,创建一个服务器，然后根据request，去拉取网页
// const http = require('http');
// const keepAliveAgent = new http.Agent({ keepAlive: true });
// const server = http.createServer((req, res) => {
//     if(req.url==="/"){
//         console.time("aaa");
//         let req1=http.get({
//             hostname: 'www.baidu.com',
//             port: 80,
//             path: '/',
//             agent: false  // create a new agent just for this one request
//         },(res2)=>{
//             let bf=new Buffer("")
//             res2.on("data",(chunk)=>{
//                 bf=Buffer.concat([bf,chunk])
//             })
//             res2.on("end",()=>{
//                 res.end(bf.toString())
//                 console.timeEnd("aaa");
//             })
//         });
//     }else{
//         res.end("none")
//     }
// });
// server.listen(8000);

const http = require('http');
const url = require('url');
const net=require("net")
const keepAliveAgent = new http.Agent({ keepAlive: true });
let socket1
const proxyRequest=function(response){
    console.time("aaa");
    console.log("主人我已经联系net，让他给我们抓网页了。")
    let req1=http.request({//链接本地http
        host: 'localhost',
        port: 8080,
        path: 'www.baidu.com:80',
        method: 'CONNECT'
    });
    req1.end()
    let buffer=new Buffer("")
    //socket是一个duplex，也是eventemitter
    req1.on("data",(buffer)=>{
        console.log("req1",buffer.toString());
    })
    req1.on("connect",(res1,socket,head)=>{
        socket1=socket
        console.log("主人net回复我了，和他说一声，我收到你的消息了")
        socket.write('GET / HTTP/1.1\r\n' +
        'Host: www.baidu.com:80\r\n' +
        'Connection: close\r\n' +
        '\r\n');
        socket.on('data', (chunk) => {
            buffer=Buffer.concat([buffer,chunk])
            //console.log("socket",buffer.toString());
        });
        socket.on('end', (chunk) => { 
            response.write(buffer.toString())
            response.end()
            console.timeEnd("aaa");
        });
    })
    return req1
}
const server = http.createServer((request, response) => {
    if(request.url==="/"){
        
        let proxy=proxyRequest(response)
    }else{
        response.end("none")
    }
})
server.on("connect",(req,cltSocket,head)=>{
    const srvUrl = url.parse(`http://${req.url}`);
    console.log("发现了有人请求proxy，立刻启动net！")
    //net.connect返回一个connect是一个duplex，也是eventemitter
    const srvSocket = net.connect(srvUrl.port, srvUrl.hostname);
    srvSocket.on("connect",()=>{
        //cltSocket.write("aaa")
        //建立了socket开始互发信息，首先是报文头部
        console.log("已经成功链接了proxy，开始写入数据")
        srvSocket.write(head);
        cltSocket.write('HTTP/1.1 200 OK\r\n' +
        'Proxy-agent: Node.js-Proxy\r\n' +
        '\r\n');
        
    })
    srvSocket.on("data",(chunk)=>{
        console.log("srvSocket",chunk.toString().split("\r\n")[0])
        cltSocket.write(chunk.toString())
    })
    cltSocket.on("data",(chunk)=>{
        console.log("cltSocket",chunk.toString().split("\r\n")[0])
        srvSocket.write(chunk.toString())
    })
    srvSocket.on("end",(chunk)=>{
        cltSocket.end()
    })
    // cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
    //                 'Proxy-agent: Node.js-Proxy\r\n' +
    //                 '\r\n');
    // srvSocket.write(head);
    //srvSocket.pipe(cltSocket).pipe(srvSocket);
})
server.listen(8080);