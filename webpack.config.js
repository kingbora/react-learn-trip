const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const loaderUtils = require("loader-utils");
const glob = require("glob");
const path = require("path");

// const filterFileName = /process_component/;
const filterFileName = /(custom_table_modal|shopping_cart)/;

function getEntry() {
    let entry = {};
    let globPath = './src/**/entry.?(j|t)s?(x)';
    let files = glob.sync(globPath);
    files.forEach(function (name) {
        let dirName = name.replace(/\.\/src\/(.+)\/entry\.(j|t)sx?$/, "$1");
        if (filterFileName.test(dirName)) {
            entry[dirName] = name;
        }
    });
    return entry;
}

// 打包入口
const entry = getEntry();
const entryKeys = Object.keys(entry);

// html输出模板
const otherPlugins = entryKeys.map(function (name) {
    return new HtmlWebpackPlugin({
        filename: name + "/index.html",
        template: "./src/index.html",
        chunks: [name] // 仅引入当前配置的js文件
    });
});
if (entryKeys.indexOf("process_component") > -1) {
    otherPlugins.push(new CopyPlugin([{
        from: "./src/process_component/mock",
        to: "mock"
    }, {
        from: "./src/process_component/download",
        to: "download"
    }]));
}

// 代理设置
let proxys = {};
entryKeys.map(function (name) {
    proxys["/" + name + "/index.html"] = "/" + name;
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
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json']
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
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: "../"
                }
            }, {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: {
                        localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                        getLocalIdent: (context, localIdentName, localName, options) => {
                            switch (localName.substr(0, 4)) {
                                case "ant-":
                                    return localName;
                                default:
                                    if (!options.context)
                                        options.context = context.options && typeof context.options.context === "string" ? context.options.context : context.context;
                                    var request = path.relative(options.context, context.resourcePath);
                                    options.content = options.hashPrefix + request + "+" + localName;
                                    localIdentName = localIdentName.replace(/\[local\]/gi, localName);
                                    var hash = loaderUtils.interpolateName(context, localIdentName, options);
                                    return hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
                            }
                        }
                    },
                },
            }, 'postcss-loader', 'sass-loader'],
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: "../"
                }
            }, 'css-loader']
        }, {
            test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|otf|ttf|svg|mp3)$/,
            use: [{
                loader: "url-loader",
                options: {
                    name: "[name].[hash:5].[ext]",
                    limit: 8192
                }
            }],
        }, {
            test: /\.json$/,
            loader: 'json-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        ...otherPlugins
    ],
    devServer: {
        proxy: proxys
    }
};