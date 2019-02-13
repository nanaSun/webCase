const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getStyleLoaders = (cssOptions, preProcessor,env) => {
    const loaders = [
        {loader:env==="development"?require.resolve('style-loader') : MiniCssExtractPlugin.loader},
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                    autoprefixer: {
                    flexbox: 'no-2009',
                    },
                    stage: 3,
                }),
                ],
            },
        },
    ];
    if (preProcessor) {
        loaders.push(require.resolve(preProcessor));
    }
    return loaders;
};
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports={getStyleLoaders,cssRegex,cssModuleRegex,sassRegex,sassModuleRegex}
