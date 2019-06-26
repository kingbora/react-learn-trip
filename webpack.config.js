const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require("glob");
const path = require("path");

function getEntry() {
    let entry = {};
    let globPath = './src/**/entry.?(j|t)s?(x)';
    let files = glob.sync(globPath);
    files.forEach(function (name) {
        let dirName = name.replace(/\.\/src\/(.+)\/entry\.(j|t)sx?$/, "$1");
        entry[dirName] = name;
    });
    return entry;
}

// 打包入口
const entry = getEntry();
const entryKeys = Object.keys(entry);

// html输出模板
const htmlPlugins = entryKeys.map(function (name) {
    return new HtmlWebpackPlugin({
        filename: name + "/index.html",
        template: "./src/index.html",
        chunks: [name] // 仅引入当前配置的js文件
    });
});

// 代理设置
let proxys = {};
entryKeys.map(function(name) {
    proxys["/" + name+"/index.html"] = "/" + name;
});

console.log(proxys);

module.exports = {
    mode: "development",
    entry: entry,
    output: {
        filename: '[name]/[name].js', // 输出对应的js文件到对应的文件夹下
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
    },
    devtool: "cheap-module-eval-source-map",
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loaders: [MiniCssExtractPlugin.loader, 'css-loader'],
            include: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        ...htmlPlugins
    ],
    devServer: {
        proxy: proxys
    }
};