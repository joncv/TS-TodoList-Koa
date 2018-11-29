var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: __dirname + "/src/index.tsx",
  output: {
    filename: "bundle-[name].js",
    path: __dirname + "/dist", // 默认是dist
    // publicPath: __dirname + '/dist/', // 配置默认import的资源地址
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".tsx", ".ts", ".js", ".json", '.less','.css']
  },
  mode: 'development',
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        include: __dirname,
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { 
                // sourceMap: true,
                // importLoaders: true,
                modules: true,
                // namedExport: true,
                // camelCase: true,
                // minimize: true,
                // localIdentName: "[local]_[hash:base64:5]"
              }
            },
            { loader: 'less-loader' }
          ]
        })
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   loader: "source-map-loader"
      // }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      title: 'todolist',
      template: './src/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('style.css'),
    new OpenBrowserPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  //   externals: {
  //       "React": "React",
  //       "ReactDOM": "ReactDOM"
  //   }
  devServer: {
    contentBase: './dist', // 服务代理的默认地址
    // port: 9000, 端口地址
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock
      '/test': {
        target: 'http://localhost:3000',
        secure: false
      }
    },
    // color: true, //终端中输出结果为彩色
    // historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    // inline: true, //实时刷新
    // hot: true  // 使用热加载插件 HotModuleReplacementPlugin
  }
};