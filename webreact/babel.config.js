const presets = [
    [
      "@babel/env",//"@babel/preset-env"
      {
        targets: {
            browsers:["last 8 versions"]
        },
      },
    ],
    [
      "@babel/react"
    ]
  ];
  
  module.exports = { presets };