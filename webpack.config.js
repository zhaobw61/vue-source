// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//     entry: 'index.js',
//     output: {
//       path: path.resolve(__dirname, './dist'),
//       filename: 'index_bundle.js'
//     },
//     plugins: [new HtmlWebpackPlugin()]
//   };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path:path.resolve(__dirname, './dist'),
        filename:'bundle.js'
    },
    devtool:'source-map',
    resolve:{ // 修改模块优先查找的路径
        modules:[path.resolve(__dirname,'source'),path.resolve('node_modules')]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname, 'public/index.html')
        })
    ]
}