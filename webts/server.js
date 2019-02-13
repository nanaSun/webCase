const webpack = require('webpack');
const webpackDevServer =require("webpack-dev-server")
const config=require("./webpack.dev")
let compiler=webpack(config)
const server = new webpackDevServer(compiler, config.devServer);

server.listen(9000, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:9000');
});
