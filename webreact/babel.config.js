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
  const plugins=[
    // ["react-hot-loader/babel"]
  ]
  module.exports = { presets,plugins };