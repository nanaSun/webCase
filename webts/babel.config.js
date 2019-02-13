const presets = [
    [
      "@babel/env",//"@babel/preset-env"
      {
        targets: {
            browsers:["last 8 versions"]
        },
      },
    ],
    // [
    //   "@babel/typescript"
    // ]
  ];
  
  module.exports = { presets };