const presets = [
    [
      "@babel/env",//"@babel/preset-env"
      {
        targets: {
            browsers:["last 8 versions"]
        },
      },
    ]
  ];
  
  module.exports = { presets };