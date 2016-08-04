/*-------- PostCSS imports ----------*/

var autoprefixer = require('autoprefixer'),
    rucksack = require('rucksack-css'),
    mqPacker = require('css-mqpacker'); 

/*----------- Server modules --------------*/

var fs = require('fs'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpack = require("webpack"),
    path = require("path");

/* ------- Directories --------*/

var rootDir = path.join(__dirname),
    distDir = path.join(__dirname, "dist");

/*-----------------------------------*/

var isDev = /^dev/i.test(process.env.NODE_ENV),
    outputPath = isDev ? '/' : '/tools/ksys336/',
    cssList = ["css-loader", "postcss-loader", "sass-loader"];

var config = {
    context: rootDir,
    entry: {
        fundexplorer: ['./src/explorer'],
        funddetails: ['./src/details']
    },
    output: {
        path: distDir,
        filename: 'ab-[name].js',
        publicPath: outputPath,
        devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {   
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract("style-loader", cssList.join("!")), 
                include: path.resolve(rootDir, "styles") 
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|otf|gif)$/,
                loader: 'file?limit=100000',
                includes: [path.join(rootDir, "images"), path.join(rootDir, "fonts")]
            },
            { test: /\.js$/, loader: "babel", include: path.resolve(rootDir, "src") }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ],
    resolve: {
        extensions: ['', '.js', ".scss"]
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['last 5 versions']}),
                rucksack({ fallbacks: true }),
                mqPacker];
    }
};

module.exports = config;