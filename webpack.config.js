module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/js/script.js',
    output: {
        filename: 'script.js',
        path: __dirname + '/dist/js'
    }
};
