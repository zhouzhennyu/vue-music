const path = require('path');
const registerRouter = require('./backend/router')

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: "less",
            patterns: [
                path.resolve(__dirname, "src/assets/styles/variable.less"),
                path.resolve(__dirname, "src/assets/styles/mixin.less"),
            ]
        }
    },
    configureWebpack: {
        devtool: 'inline-source-map',
    },
    devServer: {
        before(app) {
            registerRouter(app)
        }
    },
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/'
}