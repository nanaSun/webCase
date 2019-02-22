'use strict';
const path = require('path');
const NODE_ENV = "production";
module.exports={
  mode: NODE_ENV,
  entry:path.resolve(__dirname,'src/calculator'),
  target:"node",//web default
  output: {
    pathinfo: true,
    filename: 'umdtool.js',
    //umdNamedDefine:true,//解决umd下amd没有名字的问题
    //globalObject: 'this',//解决root默认为window的情况
    // library:"calculator",//commonjs2下无效
    // libraryTarget: 'commonjs2'
    library: 'MyLibrary',
    libraryTarget: 'global'//根据globalObject来的，或者设定target
  },
  module: {
    rules: [
            {
            test: /\.(js|mjs|jsx)$/,
            include: path.resolve(__dirname,"src"),//important
            use: {
                loader: 'babel-loader'
                }
            }
    ]
    }
};
