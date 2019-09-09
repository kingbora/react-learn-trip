const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const loaderUtils = require("loader-utils");
const { CheckerPlugin } = require('awesome-typescript-loader')
const glob = require("glob");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const filterFileName = /react_echarts/;
// const filterFileName = /(file_upload)/;

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
        title: name,
        filename: name + "/index.html",
        template: "./src/index.ejs",
        minify: { // 压缩HTML文件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 删除空白符与换行符
            minifyCSS: true // 压缩内联css
        },
        inject: !isProd,
        chunks: [name]
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

if (isProd) {
    otherPlugins.push(
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    );
}

// 代理设置
let proxys = {};
entryKeys.map(function (name) {
    proxys["/" + name + "/index.html"] = "/" + name;
});

module.exports = {
    mode: isProd ? "production" : "development",
    entry: entry,
    output: {
        filename: '[name]/[name].js', // 输出对应的js文件到对应的文件夹下
        chunkFilename: '[name]/[name].vendor.js',
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json']
    },
    devtool: isProd ? false : "cheap-module-eval-source-map",
    optimization: {
        minimize: isProd,
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false
                    },
                    warnings: false
                }
            }), new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        },
                        normalizeUnicode: false
                    }]
                },
                canPrint: true
            })
        ]
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader?cacheDirectory=true',
            include: [path.resolve(__dirname, "src")],
            exclude: /node_modules/
        }, {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: [path.resolve(__dirname, "src")],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            include: [path.resolve(__dirname, "src")],
            use: [{
                loader: MiniCssExtractPlugin.loader,
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
            }, 'postcss-loader', 'fast-sass-loader'],
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css'
        }),
        new CheckerPlugin(),
        ...otherPlugins
    ],
    devServer: {
        proxy: proxys
    }
};