const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/js/script.js',
  output: {
    filename: 'script.js',
    path: `${__dirname}/dist/js`
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2019 を ES5 に変換
                "@babel/preset-env"
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['dist'],
        middleware: [
          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
          }
        ]
      }
    })
  ]
};
